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
}
