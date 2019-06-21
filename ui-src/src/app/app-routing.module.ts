import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { MyProfileComponent } from "./MyProfile/MyProfile.component";
import { SignupComponent } from "./signup/signup.component";
import { TimelineComponent } from "./timeline/timeline.component";

// Import all the components for which navigation service has to be activated
import { SidebarComponent } from "../../src/app/sidebar/sidebar.component";
import { PostPageComponent } from "../../src/app/post-page/post-page.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  { path: "home", component: SidebarComponent },
  { path: "user/:id", component: UserProfileComponent },

  { path: "post", component: PostPageComponent },

  {
    path: "login",
    component: SignupComponent
  },
  {
    path: "myprofile",
    component: MyProfileComponent
  },
  {
    path: "timeline",
    component: TimelineComponent
  },
  {
    path: "**", // If no matching route found, go back to home route
    component: SidebarComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
