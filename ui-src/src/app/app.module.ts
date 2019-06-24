import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { PostPageComponent } from "./post-page/post-page.component";
import { AppRoutingModule } from "./app-routing.module";
import { MyProfileComponent } from "./MyProfile/MyProfile.component";
import { HttpClientModule } from "@angular/common/http";
import { TimelineComponent } from "./timeline/timeline.component";
import { SignupComponent } from "./signup/signup.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FollowersListComponent } from './followers-list/followers-list.component';
import { UnfollowersListComponent } from './unfollowers-list/unfollowers-list.component';
import { FollowingListComponent } from './following-list/following-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    UserProfileComponent,
    TimelineComponent,
    MyProfileComponent,
    SidebarComponent,
    PostPageComponent,
    SignupComponent,
    UserProfileComponent,
    MyProfileComponent,
    FollowersListComponent,
    UnfollowersListComponent,
    FollowingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
