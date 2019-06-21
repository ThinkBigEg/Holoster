import { Component } from "@angular/core";
import { PostsComponent } from "./posts/posts.component";
import { SignupComponent } from "./signup/signup.component";
import { PostUpdateComponent } from "./post-update/post-update.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Holoster";
  signUP: SignupComponent;
}
