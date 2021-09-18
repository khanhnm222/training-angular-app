import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module'; 
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { DashboardService } from './services/dashboard.service';
import { HomeComponent } from './pages/home/home.component';
import { AddNewTaskComponent } from './pages/add-new-task/add-new-task.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { UserCardListComponent } from './components/user-card-list/user-card-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { AuthorizationRequestComponent } from './pages/authorization-request/authorization-request.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    UsersComponent,
    ScheduleComponent,
    TaskCardComponent,
    UserCardComponent,
    HomeComponent,
    AddNewTaskComponent,
    TaskDetailComponent,
    UserCardListComponent,
    DialogComponent,
    AuthorizationRequestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
