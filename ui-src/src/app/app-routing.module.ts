import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Routes, RouterModule } from '@angular/router';
// Import all the components for which navigation service has to be activated 
import { SidebarComponent } from '../../src/app/sidebar/sidebar.component';
import { PostPageComponent } from '../../src/app/post-page/post-page.component';
import { SignupComponent } from '../../src/app/signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: SidebarComponent },
{ path: 'post', component: PostPageComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'userProfile', component: UserProfileComponent },
{ path: 'myProfile', component: MyProfileComponent },
{ path: '**', component: SidebarComponent } // If no matching route found, go back to home route
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
