import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";

import { Observable } from "rxjs";
import { Post } from "../Classes/Post";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  posts: Post[];

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
      .subscribe(data => (this.postHash = data));

    console.log(this.postHash);
  };

  ngOnInit() {
    this.service.getPosts().subscribe(data => (this.posts = data));
  }
}
