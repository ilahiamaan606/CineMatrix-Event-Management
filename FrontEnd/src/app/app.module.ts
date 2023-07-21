import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBarModule

import { AuthGuard } from './auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { ShowsComponent } from './shows/shows.component';
import { EventsComponent } from './events/events.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RegistrationComponent } from './registration/registration.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoviesComponent,
    ShowsComponent,
    EventsComponent,
    ProfileComponent,
    LoginComponent,
    RegistrationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule

  
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],


})
export class AppModule { }
