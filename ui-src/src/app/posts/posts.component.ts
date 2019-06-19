import { Component, OnInit, Input } from "@angular/core";
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
  @Input() userAddress: String;

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
