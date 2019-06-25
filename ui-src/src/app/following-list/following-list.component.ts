import { Component, OnInit } from "@angular/core";
import { User } from "../Classes/User";
import { DataService } from "../data.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-following-list",
  templateUrl: "./following-list.component.html",
  styleUrls: ["./following-list.component.css"]
})
export class FollowingListComponent implements OnInit {
  user: User;
  followings: object[];
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
      .makeRequest({ agent_address: this.user.hash }, "get_following")
      .subscribe(data => {
        this.followings = JSON.parse(data.result).Ok;
        console.log(this.followings);
      });
  };

  ngOnInit() {
    this.user = new User();
    this.user.posts = [];
    this.followings = [];
    this.user.hash = this.route.snapshot.paramMap.get("id");
    this.getUserData();
  }
}
