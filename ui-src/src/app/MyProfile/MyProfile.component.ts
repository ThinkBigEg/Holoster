import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../data.service";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";

import { Post } from "../Classes/Post";
import { User } from "../Classes/User";
import { Router } from "@angular/router";

@Component({
  selector: "app-posts",
  templateUrl: "./MyProfile.component.html",
  styleUrls: ["./MyProfile.component.css"]
})
export class MyProfileComponent implements OnInit {
  user: User;

  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private router: Router
  ) {}

  postForm = this.fb.group({
    content: ["", Validators.required]
  });

  createPost = () => {
    let content = this.postForm.get("content").value;
    if (content.length == 0) return;
    let timestamp = Date.now();
    let params = { content: content, timestamp: Math.floor(timestamp / 1000) };
    this.service.makeRequest(params, "create_post").subscribe(data => {
      let createdPostHash = JSON.parse(data.result).Ok;
      this.service
        .makeRequest({ post_address: createdPostHash }, "get_post")
        .subscribe(data => {
          let post: Post = JSON.parse(JSON.parse(data.result).Ok.App[1]);
          post.creator = this.user;
          post.hash = createdPostHash;
          this.user.posts.push(post);
        });
    });
  };

  deletePost = (post: Post) => {
    console.log(post.hash);

    this.service
      .makeRequest({ post_address: post.hash }, "delete_post")
      .subscribe(() => {
        this.user.posts = this.user.posts.filter(obj => obj !== post);
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
              this.user.posts.push(post);
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
  };

  ngOnInit() {
    this.service.makeRequest({}, "get_my_profile").subscribe(data => {
      let users = JSON.parse(data.result).Ok;
      if (users.length == 0) {
        this.router.navigate(["signup"]);
      } else {
        this.user = new User();
        this.user.posts = [];
        this.user.hash = localStorage.getItem("userHash");
        this.getUserData();
        this.loadPosts();
      }
    });
  }
}
