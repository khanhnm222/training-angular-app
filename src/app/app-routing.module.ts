import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleGuard } from './guards/schedule.guard';
import { UsersGuard } from './guards/users.guard';
import { AddNewTaskComponent } from './pages/add-new-task/add-new-task.component';
import { AuthorizationRequestComponent } from './pages/authorization-request/authorization-request.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    children: [{
        path: '',
        component: DashboardComponent
      },
      {
        path: 'create-new-task',
        component: AddNewTaskComponent
      },
      {
        path: 'preview-task/:id',
        component: TaskDetailComponent
      },
    ]  
  },
  {
    path: 'users',
    children: [{
      path: '',
      component: UsersComponent,
      canActivate: [UsersGuard]
    },
    {
      path: 'authorization-request',
      component: AuthorizationRequestComponent
    }
  ],
    
  },
  {
    path: 'schedule',
    children: [{
      path: '',
      component: ScheduleComponent,
      canActivate: [ScheduleGuard]
    },
    {
      path: 'authorization-request',
      component: AuthorizationRequestComponent
    }
  ]
    
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
