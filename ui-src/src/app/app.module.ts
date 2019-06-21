import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SignupComponent } from "./signup/signup.component";

import { ReactiveFormsModule } from "@angular/forms";
import { UserProfileComponent } from "./UserProfile/UserProfile.component";
import { UsersComponent } from "./users/users.component";
import { HttpClientModule } from "@angular/common/http";
import { PostUpdateComponent } from "./post-update/post-update.component";
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    UserProfileComponent,
    UsersComponent,
    PostUpdateComponent,
    TimelineComponent
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
