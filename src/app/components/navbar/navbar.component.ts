import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges {

  @Input() activeNav: string = 'dashboard';

  currentRoute: string = '';
  activeId: string = 'pills-dashboard-tab';
  userName: string = '';
  isAuthenticated: boolean = false;
  constructor(
    private navBarService: NavBarService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.navBarService.navName$.subscribe(name => {
      this.activeId = name;
    });
    this.authService.user$.subscribe(user => {
      this.userName = user.userName;
      if (user.userName) {
        this.isAuthenticated = true;
      }
    });
    this.getActiveRouter();
  }

  public getActiveRouter() {
    if(location.pathname.substr(1) !== '') {
      if((location.pathname.substr(1).includes('dashboard'))) {
        this.activeId = 'pills-dashboard-tab';
      } else if((location.pathname.substr(1).includes('users'))) {
        this.activeId = 'pills-users-tab';
      } else if((location.pathname.substr(1).includes('schedule'))) {
        this.activeId = 'pills-schedule-tab';
      } else if((location.pathname.substr(1).includes('login'))) {
        this.activeId = 'pills-login-tab';
      }
    } else {
      this.activeId = 'pills-dashboard-tab';
    }
  }
  
  ngOnChanges() {
    this.getActiveRouter();
    
  }

  openDialog() {
    const navName = `pills-logout-tab`;
    this.navBarService.changeNavBar(navName);
  }

  onLogout() {
    this.addClass('pills-logout-tab');
    this.authService.setUser({userName: '', password: ''});
    this.isAuthenticated = false;
    const navName = `pills-login-tab`;
    this.navBarService.changeNavBar(navName);
    this.router.navigate(['login']);
  }

  onCancelLogout() {
    this.getActiveRouter();
  }

  addClass(elementId: string) {
    this.activeId = elementId;
  }
}
