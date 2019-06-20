import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../data.service";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";

import { Post } from "../Classes/Post";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  posts: Object;
  fakePosts: Object;
  postHash: String;
  @Input() userAddress: String;

  constructor(private fb: FormBuilder, private service: DataService) {}

  postForm = this.fb.group({
    content: ["", Validators.required],
    timestamp: ["", Validators.required]
  });

  createPost = () => {
    let content = this.postForm.get("content").value;
    let timestamp = new Date().getTime() / 1000;
    this.service
      .createPost(content, timestamp)
      .subscribe(data => (this.postHash = JSON.parse(data.result).Ok));

    console.log(this.postHash);
  };

  // Loads user's posts
  loadPosts = () => {
    this.service.loadPosts(this.userAddress).subscribe(data => {
      let posts = JSON.parse(data.result).Ok;
      this.posts = posts;
      console.log(this.posts);
    });
  };

  deletePost = postToDelete => {
    console.log(postToDelete.id + " Post deleted");
    //This line won't work here, just for demonistration.
    this.service.deletePost(postToDelete.id);
  };

  ngOnInit() {
    //this.service.getPosts().subscribe(data => (this.posts = data));
    this.userAddress = localStorage.getItem("userHash");
    this.loadPosts();
  }
}
