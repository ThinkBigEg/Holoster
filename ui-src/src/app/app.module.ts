import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { PostPageComponent } from "./post-page/post-page.component";
import { AppRoutingModule } from "./app-routing.module";

import { ReactiveFormsModule } from "@angular/forms";
import { MyProfileComponent } from "./MyProfile/MyProfile.component";

import { HttpClientModule } from "@angular/common/http";
import { PostUpdateComponent } from "./post-update/post-update.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { SignupComponent } from "./signup/signup.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    UserProfileComponent,
    PostUpdateComponent,
    TimelineComponent,
    MyProfileComponent,
    SidebarComponent,
    PostPageComponent,
    PostUpdateComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
