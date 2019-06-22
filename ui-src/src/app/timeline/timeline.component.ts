import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";

import { Post } from "../Classes/Post";
import { User } from "../Classes/User";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css", "../sidebar/sidebar.component.css"]
})
export class TimelineComponent implements OnInit {
  user: User;
  followedUsersPosts: Post[];
  constructor(private service: DataService) {}

  loadTimeline = () => {
    this.service.makeRequest({}, "generate_news_feed").subscribe(data => {
      console.log(data);
      let following = JSON.parse(data.result).Ok;
      following.forEach(element => {
        let post = new Post(
          element.content,
          element.creator_hash,
          element.timestamp,
          element.hash
        );
        post.hash = element.hash;
        this.followedUsersPosts.push(post);
      });
    });
  };

  ngOnInit() {
    this.user = new User();
    this.followedUsersPosts = [];
    let post = new Post(
      "qaqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilqabilbil",
      38383838,
      "1929292",
      "temp hash"
    );
    this.followedUsersPosts.push(post);
    this.user.hash = localStorage.getItem("userHash");
    this.loadTimeline();
  }
}
