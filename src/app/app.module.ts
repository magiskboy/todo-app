import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';

import { UserService } from '../services/user.service';
import { ConfigService } from '../services/config.service';
import { HttpService } from '../services/http.service';
import { LocalStorageService } from '../services/localStorage.service';
import { TaskService } from '../services/task.service';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    TasksPageComponent,
    NavbarComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
    ConfigService,
    HttpService,
    LocalStorageService,
    TaskService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
