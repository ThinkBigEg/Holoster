import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";

import { Post } from "../Classes/Post";
import { User } from "../Classes/User";
import { post } from "selenium-webdriver/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css", "../sidebar/sidebar.component.css"]
})
export class TimelineComponent implements OnInit {
  user: User;
  timeLinePosts: Post[];
  constructor(private service: DataService, private router: Router) {}

  loadFollowedPosts = () => {
    this.service.makeRequest({}, "generate_news_feed").subscribe(data => {
      let following = JSON.parse(data.result).Ok;
      following.forEach(element => {
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
            post.timeStamp = element.timeStamp;
            this.timeLinePosts.push(post);
          });
      });
    });
  };
  loadUserPosts = () => {
    this.service
      .makeRequest({ user_address: this.user.hash }, "get_user_posts")
      .subscribe(data => {
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
              post.timeStamp = element.timeStamp;
              this.timeLinePosts.push(post);
            });
        });
      });
  };

  loadTimeLine = () => {
    this.loadUserPosts();
    this.loadFollowedPosts();
    this.timeLinePosts.sort(this.compare);
  };
  ngOnInit() {
    this.service.makeRequest({}, "get_my_profile").subscribe(data => {
      let users = JSON.parse(data.result).Ok;
      if (users.length == 0) {
        this.router.navigate(["signup"]);
      } else {
        this.user = new User();
        this.timeLinePosts = [];
        this.user.hash = localStorage.getItem("userHash");
        this.loadTimeLine();
      }
    });
  }

  compare(a: Post, b: Post) {
    if (a.timeStamp < b.timeStamp) {
      return -1;
    }
    if (a.timeStamp > b.timeStamp) {
      return 1;
    }
    return 0;
  }
}
