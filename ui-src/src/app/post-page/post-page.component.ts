import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";
import { Post } from "../Classes/Post";
import { DataService } from "../data.service";
import { Comment } from "../Classes/Comment";
import { from } from "rxjs";
import { User } from "../Classes/User";
import { Vote } from "../Classes/Vote";
import { forEach } from "@angular/router/src/utils/collection";
@Component({
  selector: "app-post-page",
  templateUrl: "./post-page.component.html",
  styleUrls: ["./post-page.component.css"]
})
export class PostPageComponent implements OnInit {
  private post: Post;
  constructor(private route: ActivatedRoute, private service: DataService) {}

  getPostWithHash = () => {
    this.service
      .makeRequest({ post_address: this.post.hash }, "get_post")
      .subscribe(data => {
        const post = JSON.parse(JSON.parse(data.result).Ok.App[1]);
        this.service
          .makeRequest(
            { agent_address: post.creator_hash },
            "get_member_profile"
          )
          .subscribe(data => {
            this.post.creator = new User();
            let userData = JSON.parse(data.result).Ok[0];
            this.post.creator.handle = userData.name;
            this.post.creator.avatarURL = userData.avatar_url;
            this.post.creator.hash = post.creator_hash;
            this.post.content = post.content;
            this.post.timeStamp = post.timestamp;
            this.service
              .makeRequest(
                {
                  target_address: this.post.hash,
                  _state: true,
                  target: "post",
                  _type: "up"
                },
                "get_votes"
              )
              .subscribe(data => {
                let upVotes = JSON.parse(data.result).Ok;
                upVotes.forEach(element => {
                  this.post.votes.push(new Vote(1, element.creator_hash));
                });

                this.service
                  .makeRequest(
                    {
                      target_address: this.post.hash,
                      target: "post",
                      _type: "down"
                    },
                    "get_votes"
                  )
                  .subscribe(data => {
                    let downVotes = JSON.parse(data.result).Ok;
                    downVotes.forEach(element => {
                      this.post.votes.push(new Vote(-1, element.creator_hash));
                    });
                    this.post.value = this.evaluateCommentValue(
                      this.post.votes
                    );
                  });
              });
          });
        this.loadComments();
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
            console.log(commentOrPost.votes);
          });
      });
  };
  upVote = commentOrPost => {
    let votes: Vote[] = commentOrPost.votes;
    let currentUserHash = sessionStorage.getItem("userHash");
    let state: boolean = !(
      votes.filter(v => v.creatorHash == currentUserHash && v.value == 1)
        .length > 0
    );
    let params = {
      target_address: commentOrPost.hash,
      _state: state,
      target: commentOrPost.constructor.name.toLocaleLowerCase(),
      _type: "up"
    };
    this.service.makeRequest(params, "vote").subscribe(data => {
      this.reEvaluateVotes(commentOrPost);
    });
  };

  downVote = commentOrPost => {
    let votes: Vote[] = commentOrPost.votes;
    let currentUserHash = sessionStorage.getItem("userHash");
    let state: boolean = !(
      votes.filter(v => v.creatorHash == currentUserHash && v.value == -1)
        .length > 0
    );
    let params = {
      target_address: commentOrPost.hash,
      _state: state,
      target: commentOrPost.constructor.name.toLocaleLowerCase(),
      _type: "down"
    };
    this.service.makeRequest(params, "vote").subscribe(() => {
      this.reEvaluateVotes(commentOrPost);
    });
  };

  addComment = () => {
    let comment: string = (<HTMLInputElement>(
      document.getElementById("SearchTerm")
    )).value;
    if (comment.length == 0) {
      return;
    }
    const timeStamp: number = Math.floor(Date.now() / 1000);
    this.service
      .makeRequest(
        {
          content: comment,
          timestamp: timeStamp,
          post_address: this.post.hash
        },
        "create_comment"
      )
      .subscribe(data => {
        let commentHash = JSON.parse(data.result).Ok;
        this.service
          .makeRequest({ comment_address: commentHash }, "get_comment")
          .subscribe(data => {
            let commentData = JSON.parse(JSON.parse(data.result).Ok.App[1]);
            this.post.comments.push(
              new Comment(
                commentData.content,
                commentData.timestamp,
                commentData.creator_hash,
                commentHash
              )
            );
          });
      });
  };
  loadComments = () => {
    this.service
      .makeRequest({ post_address: this.post.hash }, "get_post_comments")
      .subscribe(data => {
        let comments = JSON.parse(data.result).Ok;
        comments.forEach(element => {
          this.service
            .makeRequest(
              {
                content: element.content,
                creator_hash: element.creator_hash,
                timestamp: element.timestamp
              },
              "get_comment_address"
            )
            .subscribe(data => {
              let comment: Comment = new Comment(
                element.content,
                element.timestamp,
                element.creator_hash,
                JSON.parse(data.result).Ok
              );
              this.service
                .makeRequest(
                  {
                    target_address: comment.hash,
                    target: "comment",
                    _type: "up"
                  },
                  "get_votes"
                )
                .subscribe(data => {
                  let upVotes = JSON.parse(data.result).Ok;
                  upVotes.forEach(element => {
                    comment.votes.push(new Vote(1, element.creator_hash));
                  });

                  this.service
                    .makeRequest(
                      {
                        target_address: comment.hash,
                        target: "comment",
                        _type: "down"
                      },
                      "get_votes"
                    )
                    .subscribe(data => {
                      let upVotes = JSON.parse(data.result).Ok;
                      upVotes.forEach(element => {
                        comment.votes.push(new Vote(-1, element.creator_hash));
                      });
                      comment.value = this.evaluateCommentValue(comment.votes);
                      this.post.comments.push(comment);
                    });
                });
            });
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
    this.post = new Post("", 1, null, hash);
    this.post.comments = [];
    this.getPostWithHash();
  }
}
