import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { connect } from "@holochain/hc-web-client";
import { DataService } from "../data.service";
import { computeStyle } from "@angular/animations/browser/src/util";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder, private service: DataService) {}
  res: object;

  profileForm = this.fb.group({
    handle: ["", Validators.required],
    avatar: ["", Validators.required]
  });

  signUp = () => {
    let handle = this.profileForm.get("handle").value;
    let avatarLink = this.profileForm.get("avatar").value;
    this.service
      .signUp(handle, avatarLink)
      .subscribe(data => (this.res = data));
  };

  ngOnInit() {}
}
