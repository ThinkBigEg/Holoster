import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";

import { Post } from "../Classes/Post";
import { User } from "../Classes/User";
import { post } from "selenium-webdriver/http";
import { Router } from "@angular/router";
import { Vote } from "../Classes/Vote";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css", "../sidebar/sidebar.component.css"]
})
export class TimelineComponent implements OnInit {
  user: User;
  timeLinePosts: Post[];
  constructor(private service: DataService, private router: Router) {}

  loadTimeLine = () => {
    this.service.makeRequest({}, "generate_news_feed").subscribe(data => {
      let posts = JSON.parse(data.result).Ok;
      posts.forEach(element => {
        let post: Post;
        this.service
          .makeRequest(
            { agent_address: element.creator_hash },
            "get_member_profile"
          )
          .subscribe(data => {
            post = new Post("", -1, null, "");
            post.creator = new User();
            let userData = JSON.parse(data.result).Ok[0];
            post.creator.handle = userData.name;
            post.creator.avatarURL = userData.avatar_url;
            post.creator.hash = userData.agent_address;
            post.content = element.content;
            post.timeStamp = element.timestamp;
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
                this.timeLinePosts.push(post);
              });
          });
      });
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
  reEvaluateVotes = commentOrPost => {
    commentOrPost.votes = [];
    this.service
      .makeRequest(
        {
          target_address: commentOrPost.hash,
          target: commentOrPost.constructor.name.toLocaleLowerCase(),
          _type: "up"
        },
        "get_votes"
      )
      .subscribe(data => {
        let upVotes = JSON.parse(data.result).Ok;
        upVotes.forEach(element => {
          commentOrPost.votes.push(new Vote(1, element.creator_hash));
        });

        this.service
          .makeRequest(
            {
              target_address: commentOrPost.hash,
              target: commentOrPost.constructor.name.toLocaleLowerCase(),
              _type: "down"
            },
            "get_votes"
          )
          .subscribe(data => {
            let downVotes = JSON.parse(data.result).Ok;

            downVotes.forEach(element => {
              commentOrPost.votes.push(new Vote(-1, element.creator_hash));
            });
            commentOrPost.value = this.evaluateCommentValue(
              commentOrPost.votes
            );
            console.log(commentOrPost.value);
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
    this.service.makeRequest({}, "get_my_profile").subscribe(data => {
      let users = JSON.parse(data.result).Ok;
      if (users.length == 0) {
        this.router.navigate(["signup"]);
      } else {
        this.user = new User();
        this.timeLinePosts = [];
        this.user.hash = sessionStorage.getItem("userHash");
        this.loadTimeLine();
      }
    });
  }
}
