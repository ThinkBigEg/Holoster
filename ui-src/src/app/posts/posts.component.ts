import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";

import { Observable } from "rxjs";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  posts$: Object;

  constructor(private fb: FormBuilder, private data: DataService) {}

  postForm = this.fb.group({
    content: ["", Validators.required],
    timestamp: ["", Validators.required]
  });

  createPost = () => {
    this.postForm.controls["timestamp"].setValue(new Date().getTime() / 1000);
    console.log(this.postForm.get("timestamp").value);
  };

  ngOnInit() {
    this.data.getPosts().subscribe(data => (this.posts$ = data));
  }
}
