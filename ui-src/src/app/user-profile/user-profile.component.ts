import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../data.service";
import { User } from "../Classes/User";
import { Post } from "../Classes/Post";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {
  user: User;
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
    this.service
      .makeRequest({ agent_address: this.user.hash }, "get_followed_by")
      .subscribe(data => {
        let followers = JSON.parse(data.result).Ok;
        this.user.followersNumber = followers.length;
      });
    this.service
      .makeRequest({ agent_address: this.user.hash }, "get_following")
      .subscribe(data => {
        let followings = JSON.parse(data.result).Ok;
        this.user.followingsNumber = followings.length;
      });
  };

  ngOnInit() {
    const hash: string = this.route.snapshot.paramMap.get("id");
    // if (sessionStorage.getItem("userHash") == hash) {
    //   this.router.navigate(["myprofile"]);
    // }
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
