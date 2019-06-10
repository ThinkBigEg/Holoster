import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SignupComponent } from "./signup/signup.component";

import { ReactiveFormsModule } from "@angular/forms";
import { PostsComponent } from "./posts/posts.component";
import { UsersComponent } from "./users/users.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, SignupComponent, PostsComponent, UsersComponent],
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
