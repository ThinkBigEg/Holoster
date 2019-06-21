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
<<<<<<< HEAD
    this.service
      .makeRequest({ name: handle, avatar_url: avatarLink }, "register")
      .subscribe(data => {
        let userHash = JSON.parse(data.result).Ok;
        localStorage.setItem("userHash", userHash);
        localStorage.setItem("userHandle", handle);
      });
<<<<<<< HEAD
||||||| merged common ancestors
    this.service.signUp(handle, avatarLink).subscribe(data => {
      let userHash = JSON.parse(data.result).Ok;
      localStorage.setItem("userHash", userHash);
      console.log(userHash);
    });
=======
    this.service
      .makeRequest({ name: handle, avatar_url: avatarLink }, "register")
      .subscribe(data => {
        let userHash = JSON.parse(data.result).Ok;
        localStorage.setItem("userHash", userHash);
      });
>>>>>>> origin/UIPostBugFix
||||||| merged common ancestors
=======

  };

  goToHomePage = (hash: string) => {
    console.log(hash);
>>>>>>> 5a5d82307ab834988ebbe104171a751df08d2151
  };

  ngOnInit() {}
}
