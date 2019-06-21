import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../data.service";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";

import { Post } from "../Classes/Post";
import { User } from "../Classes/User";
import { Comment } from "../Classes/Comment";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css"]
})
export class TimelineComponent implements OnInit {
  user: User;
  followedUsersPosts: Post[] = [];
  constructor(private service: DataService) {}

  loadTimeline = () => {
    this.service.makeRequest({}, "generate_news_feed").subscribe(data => {
      console.log(data);
      let following = JSON.parse(data.result).Ok;
      following.forEach(element => {
        this.followedUsersPosts.push(
          new Post(element.content, element.creator_hash, element.timestamp)
        );
      });
    });
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
    console.log(post.comments);
  };

  ngOnInit() {
    this.user = new User();
    this.user.hash = localStorage.getItem("userHash");
    console.log(this.user.hash);
    this.loadTimeline();
  }
}
