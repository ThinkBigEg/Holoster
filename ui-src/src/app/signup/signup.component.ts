import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { connect } from '@holochain/hc-web-client'

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder) {
  }

  profileForm = this.fb.group({
    handle: ["", Validators.required],
    email: ["", Validators.required],
    avatar: ["", Validators.required]
  });

  signUp = () => {
    console.log(this.profileForm.get("handle").value);
  };

  ngOnInit() {}
}
