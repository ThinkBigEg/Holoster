import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostsComponent } from "./posts/posts.component";
import { SignupComponent } from "./signup/signup.component";
import { PostUpdateComponent } from "./post-update/post-update.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: SignupComponent
  },
  {
    path: "posts",
    component: PostsComponent
  },
  { path: "updatePost/:id", component: PostUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
