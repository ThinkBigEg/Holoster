import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostPageComponent } from './post-page/post-page.component';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from "@angular/forms";
import { PostsComponent } from "./posts/posts.component";
import { HttpClientModule } from "@angular/common/http";
import { PostUpdateComponent } from "./post-update/post-update.component";
import {SignupComponent} from "./signup/signup.component";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    PostsComponent,
    PostUpdateComponent,
    SidebarComponent,
    PostPageComponent
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
export class AppModule { }
