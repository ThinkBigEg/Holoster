import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../data.service";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";

import { Post } from "../Classes/Post";
import { User } from "../Classes/User";

@Component({
  selector: "app-posts",
  templateUrl: "./MyProfile.component.html",
  styleUrls: ["./MyProfile.component.css"]
})
export class MyProfileComponent implements OnInit {
  user: User;

  constructor(private fb: FormBuilder, private service: DataService) {}

  postForm = this.fb.group({
    content: ["", Validators.required],
    timestamp: ["", Validators.required]
  });

  createPost = () => {
    let content = this.postForm.get("content").value;
    let timestamp = new Date().getTime() / 1000;
    let params = { content: content, timestamp: Math.floor(timestamp) };
    this.service.makeRequest(params, "create_post").subscribe(data => {
      let createdPostHash = JSON.parse(data.result).Ok;
      this.service
        .makeRequest({ post_address: createdPostHash }, "get_post")
        .subscribe(data => {
          let post: Post = JSON.parse(data.result).Ok;
          this.user.posts.push(post);
        });
    });
    location.reload();
  };

  deletePost = (post: Post) => {
    let postData = {
      post_entry: {
        content: post.content,
        creator_hash: this.user.hash,
        timestamp: post.timeStamp
      }
    };
    this.service.makeRequest(postData, "get_post_address").subscribe(data => {
      let postHash = JSON.parse(data.result).Ok;
      this.service
        .makeRequest({ post_address: postHash }, "delete_post")
        .subscribe(() => {
          this.user.posts = this.user.posts.filter(obj => obj !== post);
        });
    });
  };

  loadPosts = () => {
    this.service
      .makeRequest({ user_address: this.user.hash }, "get_user_posts")
      .subscribe(data => {
        let posts = JSON.parse(data.result).Ok;
        posts.forEach(element => {
          this.user.posts.push(
            new Post(element.content, element.timestamp, element.creator_hash)
          );
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
  };

  ngOnInit() {
    this.user = new User();
    this.user.hash = localStorage.getItem("userHash");
    this.getUserData();
    this.loadPosts();
  }
}
