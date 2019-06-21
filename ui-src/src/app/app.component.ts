import { Component } from "@angular/core";
import { SignupComponent } from "./signup/signup.component";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Holoster";
  signUP: SignupComponent;
}
