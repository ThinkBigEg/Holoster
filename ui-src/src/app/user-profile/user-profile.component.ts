import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../data.service";
import { User } from "../Classes/User";
import { Post } from "../Classes/Post";
import { Vote } from "../Classes/Vote";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {
  user: User;
  isFollowed: boolean;
  constructor(
    public service: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  follow = () => {
    this.service
      .makeRequest({ agent_address: this.user.hash }, "follow_user")
      .subscribe(data => {
        this.getUserData();
      });
  };
  unfollow = () => {
    this.service
      .makeRequest({ agent_address: this.user.hash }, "unfollow_user")
      .subscribe(data => {
        this.getUserData();
      });
  };
  loadPosts = () => {
    this.service
      .makeRequest({ user_address: this.user.hash }, "get_user_posts")
      .subscribe(data => {
        let posts = JSON.parse(data.result).Ok;
        posts.forEach(element => {
          let post: Post;
          this.service
            .makeRequest(element, "get_post_address")
            .subscribe(data => {
              let address = JSON.parse(data.result).Ok;
              post = new Post(
                element.content,
                element.timestamp,
                this.user,
                address
              );
              this.service
                .makeRequest(
                  {
                    content: post.content,
                    timestamp: post.timeStamp,
                    creator_hash: post.creator.hash
                  },
                  "get_post_address"
                )
                .subscribe(data => {
                  post.hash = JSON.parse(data.result).Ok;
                  this.service
                    .makeRequest(
                      {
                        target_address: post.hash,
                        _state: true,
                        target: "post",
                        _type: "up"
                      },
                      "get_votes"
                    )
                    .subscribe(data => {
                      let upVotes = JSON.parse(data.result).Ok;
                      upVotes.forEach(element => {
                        post.votes.push(new Vote(1, element.creator_hash));
                      });

                      this.service
                        .makeRequest(
                          {
                            target_address: post.hash,
                            target: "post",
                            _type: "down"
                          },
                          "get_votes"
                        )
                        .subscribe(data => {
                          let downVotes = JSON.parse(data.result).Ok;
                          downVotes.forEach(element => {
                            post.votes.push(new Vote(-1, element.creator_hash));
                          });
                          post.value = this.evaluateCommentValue(post.votes);
                        });
                    });
                  this.user.posts.push(post);
                });
            });
        });
      });
  };

  getUserData = () => {
    this.service
      .makeRequest({ agent_address: this.user.hash }, "get_member_profile")
      .subscribe(data => {
        let userData = JSON.parse(data.result).Ok[0];
        this.user.handle = userData.name;
        this.user.avatarURL = userData.avatar_url;
      });
    this.service
      .makeRequest({ agent_address: this.user.hash }, "get_followed_by")
      .subscribe(data => {
        let followers = JSON.parse(data.result).Ok;
        this.user.followersNumber = followers.length;
        this.isFollowed =
          followers.filter(
            f => f.agent_address == sessionStorage.getItem("userHash")
          ).length > 0;
      });
    this.service
      .makeRequest({ agent_address: this.user.hash }, "get_following")
      .subscribe(data => {
        let followings = JSON.parse(data.result).Ok;
        this.user.followingsNumber = followings.length;
      });
  };

  upVote = (post: Post) => {
    let votes: Vote[] = post.votes;
    let currentUserHash = sessionStorage.getItem("userHash");
    let state: boolean = !(
      votes.filter(v => v.creatorHash == currentUserHash && v.value == 1)
        .length > 0
    );
    let isDownVoted: boolean =
      votes.filter(v => v.creatorHash == currentUserHash && v.value == -1)
        .length > 0;
    let params = {
      target_address: post.hash,
      _state: state,
      target: "post",
      _type: "up"
    };
    this.service.makeRequest(params, "vote").subscribe(data => {
      this.reEvaluateVotes(post);
    });
  };

  downVote = (post: Post) => {
    let votes: Vote[] = post.votes;
    let currentUserHash = sessionStorage.getItem("userHash");
    let state: boolean = !(
      votes.filter(v => v.creatorHash == currentUserHash && v.value == -1)
        .length > 0
    );
    let params = {
      target_address: post.hash,
      _state: state,
      target: "post",
      _type: "down"
    };
    this.service.makeRequest(params, "vote").subscribe(() => {
      this.reEvaluateVotes(post);
    });
  };
  reEvaluateVotes = (post: Post) => {
    post.votes = [];
    this.service
      .makeRequest(
        {
          target_address: post.hash,
          target: "post",
          _type: "up"
        },
        "get_votes"
      )
      .subscribe(data => {
        let upVotes = JSON.parse(data.result).Ok;
        upVotes.forEach(element => {
          post.votes.push(new Vote(1, element.creator_hash));
        });

        this.service
          .makeRequest(
            {
              target_address: post.hash,
              target: "post",
              _type: "down"
            },
            "get_votes"
          )
          .subscribe(data => {
            let downVotes = JSON.parse(data.result).Ok;

            downVotes.forEach(element => {
              post.votes.push(new Vote(-1, element.creator_hash));
            });
            post.value = this.evaluateCommentValue(post.votes);
            console.log(post.votes);
          });
      });
  };
  evaluateCommentValue = (votes: Vote[]) => {
    let value = 0;
    votes.forEach(vote => {
      value += vote.value;
    });
    return value;
  };
  ngOnInit() {
    const hash: string = this.route.snapshot.paramMap.get("id");
    if (sessionStorage.getItem("userHash") == hash) {
      this.router.navigate(["myprofile"]);
    }
    if (sessionStorage.getItem("userHash") == null) {
      this.router.navigate(["signup"]);
    }
    this.user = new User();
    this.user.posts = [];
    this.user.hash = hash;
    this.getUserData();
    this.loadPosts();
  }
}
