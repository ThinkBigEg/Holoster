import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { DataService } from "../data.service";
import { computeStyle } from "@angular/animations/browser/src/util";
import { User } from "../Classes/User";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private router: Router
  ) {}
  user: User;

  profileForm = this.fb.group({
    handle: ["", Validators.required],
    avatar: ["", Validators.required]
  });

  signUp = () => {
    let handle = this.profileForm.get("handle").value;
    let avatarLink = this.profileForm.get("avatar").value;
    if (handle.length == 0 || avatarLink.length == 0) {
      return;
    }
    this.service
      .makeRequest({ name: handle, avatar_url: avatarLink }, "register")
      .subscribe(data => {
        let userHash = JSON.parse(data.result).Ok;
        localStorage.setItem("userHash", userHash);
        this.goToHomePage(userHash);
      });
  };

  goToHomePage = (hash: string) => {
    console.log(hash);
    if (hash.length > 0) this.router.navigate(["myprofile"]);
  };

  ngOnInit() {
    this.service.makeRequest({}, "get_my_profile").subscribe(data => {
      let users = JSON.parse(data.result).Ok;
      if (users.length > 0) {
        this.router.navigate(["myprofile"]);
      }
    });
  }
}
