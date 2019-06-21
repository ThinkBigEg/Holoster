import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { UserProfileComponent } from "./UserProfile/UserProfile.component";
import { SignupComponent } from "./signup/signup.component";
import { PostUpdateComponent } from "./post-update/post-update.component";


// Import all the components for which navigation service has to be activated
import { SidebarComponent } from '../../src/app/sidebar/sidebar.component';
import { PostPageComponent } from '../../src/app/post-page/post-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home',
    component: SidebarComponent
  },
  { path: 'post',
    component: PostPageComponent
  },
  { path: '**', // If no matching route found, go back to home route
    component: SidebarComponent
  },
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
    path: "myprofile",
    component: UserProfileComponent
  },
  { path: "updatePost/:id", component: PostUpdateComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
