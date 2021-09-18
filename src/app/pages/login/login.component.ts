import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup = this._fb.group({});
  userFromService: string = '';
  passwordFromService: string = '';
  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private navBarService: NavBarService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.setDefaulUser();
  }

  get userNameCtrl() {
    return this.loginForm.get('userName');
  }

  get passwordCtrl() {
    return this.loginForm.get('password');
  }

  onSubmit(loginForm: FormGroup) {
    if (!loginForm.invalid) {
      this.authService.setUser(this.loginForm.value);
      const navName = `pills-dashboard-tab`;
      this.navBarService.changeNavBar(navName);
      this.router.navigate(['dashboard']);
    }
  }

  onChange(event: any) {
    if (event.target.checked) {
      this.setDefaulUser();
    } else {
      this.loginForm.controls.userName.enable();
      this.loginForm.controls.password.enable();
      this.loginForm.setValue({userName: '', password: ''});
    }
  }

  setDefaulUser() {
    this.authService.currentUser.subscribe(user => {
      this.userFromService = user.name;
      this.passwordFromService = user.password;
      this.loginForm.setValue({userName: user.name, password: user.password});
      this.loginForm.controls.userName.disable();
      this.loginForm.controls.password.disable();
    });
  }
}
