import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";
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
  constructor(public service: DataService, private route: ActivatedRoute) {}

  loadPosts = () => {
    this.service
      .makeRequest({ user_address: this.user.hash }, "get_user_posts")
      .subscribe(data => {
        let posts = JSON.parse(data.result).Ok;
        posts.forEach(element => {
          this.user.posts.push(
            new Post(
              element.content,
              element.timestamp,
              element.creator_hash,
              element.hash
            )
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
    const hash: string = this.route.snapshot.paramMap.get("id");
    console.log(new Date(1561144814));
    this.user.hash = hash;
    this.getUserData();
    this.loadPosts();
  }
}
