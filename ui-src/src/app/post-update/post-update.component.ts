import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-post-update",
  templateUrl: "./post-update.component.html",
  styleUrls: ["./post-update.component.css"]
})
export class PostUpdateComponent implements OnInit {
  newPostHash: String;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: DataService
  ) {}

  postForm = this.fb.group({
    content: ["", Validators.required],
    timestamp: ["", Validators.required]
  });

  ngOnInit() {}

  updatePost = () => {
    this.postForm.controls["timestamp"].setValue(new Date().getTime() / 1000);
    console.log(this.postForm.get("timestamp").value);
    let content = this.postForm.get("content").value;
    let timestamp = this.postForm.get("timestamp").value;
    const id = +this.route.snapshot.paramMap.get("id");

    console.log(id);

    //won't work either
    this.service
      .updatePost(id.toString(), content, timestamp)
      .subscribe(data => (this.newPostHash = data.toString()));

    console.log(this.newPostHash);
  };
}
