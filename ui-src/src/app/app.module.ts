import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { PostPageComponent } from "./post-page/post-page.component";
import { AppRoutingModule } from "./app-routing.module";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MyProfileComponent } from "./MyProfile/MyProfile.component";

import { HttpClientModule } from "@angular/common/http";
import { TimelineComponent } from "./timeline/timeline.component";
import { SignupComponent } from "./signup/signup.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    UserProfileComponent,
    TimelineComponent,
    MyProfileComponent,
    SidebarComponent,
    PostPageComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
