import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-authorization-request',
  templateUrl: './authorization-request.component.html',
  styleUrls: ['./authorization-request.component.scss']
})
export class AuthorizationRequestComponent implements OnInit {

  previousUrl: string = '';
  currentUrl: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private navBarService: NavBarService
  ) {
    this.currentUrl = this.router.url;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  ngOnInit(): void {
    const navName = this.currentUrl.slice(1, this.currentUrl.length - 22);
    this.navBarService.changeNavBar(`pills-${navName}-tab`);
  }

 backToPrePage() {
    const navName = `pills-dashboard-tab`;
    this.navBarService.changeNavBar(navName);
    this.router.navigate(['dashboard']);
    // this.location.back();

 }

  navigateToLogin() {
    this.navBarService.changeNavBar('pills-login-tab');
    this.router.navigate(['login']);
  }

  getPreviousRouteName() {
    
  }
}
