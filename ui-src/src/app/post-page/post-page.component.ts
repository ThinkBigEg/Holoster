import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";
import { Post } from "../Classes/Post";
import { DataService } from "../data.service";
import { Comment } from "../Classes/Comment";
import { from } from "rxjs";
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
        const post = JSON.parse(data.result).Ok;
        this.post.creatorHash = post.creator_hash;
        this.post.content = post.contetn;
        this.post.timeStamp = post.timeStamp;
      });
  };

  addComment = () => {
    var comment = (<HTMLInputElement>document.getElementById("SearchTerm"))
      .value;
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
      .subscribe(data => {});
  };
  loadComments = (post: Post) => {
    let postData = {
      post_entry: {
        content: post.content,
        creator_hash: post.creatorHash,
        timestamp: post.timeStamp
      }
    };
    this.service.makeRequest(postData, "get_post_address").subscribe(data => {
      let postHash = JSON.parse(data.result).Ok;
      this.service
        .makeRequest({ post_address: postHash }, "get_post_comments")
        .subscribe(data => {
          console.log(data);
          let comments = JSON.parse(data.result).Ok;
          comments.forEach(element => {
            post.comments.push(
              new Comment(
                element.content,
                element.timestamp,
                element.creator_hash
              )
            );
          });
        });
    });
  };
  ngOnInit() {
    const hash: string = this.route.snapshot.paramMap.get("id");
    this.post = new Post(
      "qabiqabiqabilqabilqabilqabilqabilqabilqabilqabillqabiqabilqabilqabilqabilqabilqabilqabilqabillqabiqabilqabilqabilqabilqabilqabilqabilqabillqabiqabilqabilqabilqabilqabilqabilqabilqabillqabiqabilqabilqabilqabilqabilqabilqabilqabillqabiqabilqabilqabilqabilqabilqabilqabilqabillqabiqabilqabilqabilqabilqabilqabilqabilqabillqabiqabilqabilqabilqabilqabilqabilqabilqabillqabiqabilqabilqabilqabilqabilqabilqabilqabillqabiqabilqabilqabilqabilqabilqabilqabilqabillqabilqabilqabilqabilqabilqabilqabilqabill",
      1,
      "creatorhash",
      hash
    );
  }
}
