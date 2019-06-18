import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
//import { connect } from "@holochain/hc-web-client";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  posts: Object;
  fakePosts: Object;
  postHash: String;
  userAddress: String;

  constructor(private fb: FormBuilder, private service: DataService) {}

  postForm = this.fb.group({
    content: ["", Validators.required],
    timestamp: ["", Validators.required]
  });

  createPost = () => {
    this.postForm.controls["timestamp"].setValue(new Date().getTime() / 1000);
    console.log(this.postForm.get("timestamp").value);
    let content = this.postForm.get("content").value;
    let timestamp = this.postForm.get("timestamp").value;
    this.service
      .createPost(content, timestamp)
      .subscribe(data => (this.postHash = data.toString()));

    console.log(this.postHash);
  };

  // Loads user's posts
  loadPosts = () => {
    this.service
      .loadPosts(this.userAddress)
      .subscribe(data => (this.posts = data));
  };

  deletePost = postToDelete => {
    console.log(postToDelete.id + " Post deleted");
    //This line won't work here, just for demonistration.
    this.service.deletePost(postToDelete.id);
  };

  ngOnInit() {
    //this.service.getPosts().subscribe(data => (this.posts = data));
    this.service.fakeGetPosts().subscribe(data2 => {
      this.fakePosts = data2;
    });
    this.loadPosts();
  }
}
