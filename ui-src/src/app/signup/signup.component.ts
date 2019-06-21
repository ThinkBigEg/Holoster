import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { DataService } from "../data.service";
import { computeStyle } from "@angular/animations/browser/src/util";
import { User } from "../Classes/User";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder, private service: DataService) {}
  user: User;

  profileForm = this.fb.group({
    handle: ["", Validators.required],
    avatar: ["", Validators.required]
  });

  signUp = () => {
    let handle = this.profileForm.get("handle").value;
    let avatarLink = this.profileForm.get("avatar").value;

    this.service
      .makeRequest({ name: handle, avatar_url: avatarLink }, "register")
      .subscribe(data => {
        let userHash = JSON.parse(data.result).Ok;
        localStorage.setItem("userHash", userHash);
      });
  };

  goToHomePage = (hash: string) => {
    console.log(hash);
  };

  ngOnInit() {}
}
