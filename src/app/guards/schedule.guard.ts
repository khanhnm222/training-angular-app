import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate() {
    let currentUser = '';
    this.authService.user$.subscribe(user => {
      currentUser = user.userName;
    });
    if (currentUser) {
      return true;
    } else {
      this.router.navigate(['/schedule/authorization-request']);
      return false;
    }
  }
}
