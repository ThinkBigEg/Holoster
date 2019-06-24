import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { User } from "../Classes/User";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-followers-list",
  templateUrl: "./followers-list.component.html",
  styleUrls: ["./followers-list.component.css"]
})
export class FollowersListComponent implements OnInit {
  user: User;
  followers: object[];
  constructor(private service: DataService, private route: ActivatedRoute) {}
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
        this.followers = JSON.parse(data.result).Ok;
      });
  };

  ngOnInit() {
    this.user = new User();
    this.user.posts = [];
    this.followers = [];
    this.user.hash = this.route.snapshot.paramMap.get("id");
    this.getUserData();
  }
}
