import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
interface Signup {
  firstName: string;
  lastName: string;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @HostListener('DeleteUserEvent', ['$event'])
  onCustomEventCaptured(event: any) {
    this.deleteUser(event.detail.id);
  }
  isAddNew: boolean = false;
  userFormData: UserModel = {id: '', name: '', title: ''};
  users: UserModel[] = [];
  userNameInForm: string = '';
  scheduleForm: FormGroup = this._fb.group({});
  model: Signup = {firstName: '', lastName: ''};
  form: any;
  constructor(
    private usersService: UsersService,
    private _sanitizer: DomSanitizer,
    private _fb: FormBuilder,
  ) { }

  htmlForm = `<form [formGroup="scheduleForm"]>
  <div class="row mb-3">
    <label for="inputEmail1" class="col-sm-2 col-form-label title">Schedule Title:</label>
    <div class="col-sm-10">
      <input
        type="text"
        class="form-control"
        id="inputEmail1"
        formControlName="title"
        required>
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputEmail2" class="col-sm-2 col-form-label title">Location:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputEmail2">
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputEmail3" class="col-sm-2 col-form-label title">Description:</label>
    <div class="col-sm-10">
      <input
        type="text"
        class="form-control"
        id="inputEmail3"
        formControlName="description"
        required>
    </div>
  </div>
  <div class="row mb-3">
    <div class="col-md-6">
      <label for="inputEmail3" class="col-form-label title">Start time:</label>
      <input
          type="text"
          class="form-control"
          id="inputEmail3"
          formControlName="startTime"
          required>
    </div>
    <div class="col-md-6">
      <label for="inputEmail3" class="col-form-label title">End time:</label>
      <input
        type="text"
        class="form-control"
        id="inputEmail3"
        formControlName="endTime"
        required>
  </div>
</form>`;

    htmlForm1 = `<form #form="ngForm">
    <div class="form-group" [ngClass]="{
      'has-danger': firstName.invalid && (firstName.dirty || firstName.touched),
      'has-success': firstName.valid && (firstName.dirty || firstName.touched)}">
      <label>First Name</label>
      <input type="text" class="form-control" name="firstName" [(ngModel)]="model.firstName" required
        #firstName="ngModel">
      <div class="form-control-feedback" *ngIf="firstName.errors && (firstName.dirty || firstName.touched)">
        <p *ngIf="firstName.errors.required">First name is required</p>
      </div>
    </div>
  
    <div class="form-group" [ngClass]="{
      'has-danger': lastName.invalid && (lastName.dirty || lastName.touched),
      'has-success': lastName.valid && (lastName.dirty || lastName.touched)}">
      <label>Last Name</label>
      <input type="text" class="form-control" name="lastName" [(ngModel)]="model.lastName" required #lastName="ngModel">
      <div class="form-control-feedback" *ngIf="lastName.errors && (lastName.dirty || lastName.touched)">
        <p *ngIf="lastName.errors.required">Last name is required</p>
      </div>
    </div>
    
  </form>`;

  public get scheduleFormHtml() : SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(this.htmlForm1);
  }

  ngOnInit(): void {
    this.getAllUserData();
    this.createScheduleForm();
  }

  createScheduleForm() {
    this.scheduleForm = this._fb.group({
      title: '',
      creator: '',
      location: '',
      description: '',
      startTime: '',
      endTime: ''
    });
  }

  getAllUserData() {
    return this.usersService.getAllUsers().subscribe(data => {
      this.users = data;
    });;
  }

  showAddUser() {
    this.isAddNew = true;
  }

  hideAddUser() {
    this.resetForm();
    this.isAddNew = false;
  }

  createUser(formData: UserModel) {
    this.usersService.postUser(formData).subscribe(res => {
      if (res) {
        this.users.reverse();
        this.users.push(res);
        this.users.reverse();
        this.hideAddUser()
      }
    });
  }

  updateUser(formData: UserModel) {
    this.usersService.putUser(formData.id, formData).subscribe(res => {
      if (res) {
        const newUsers = this.users;
        newUsers.forEach(user => {
          if (user.id === formData.id) {
            user.name = formData.name,
            user.title = formData.title
          }
        });
        this.users = newUsers;
      }
    });
  }

  deleteUser(id: string) {
    this.usersService.deleteUser(id).subscribe(res => {
     if (res) {
      const newUserList = this.users.filter(user => user.id !== id);
      this.users = newUserList;
     }
    });
  }

  onSaveSchedule() {
    this.scheduleForm.patchValue({creator: this.userNameInForm});
  }

  addScheduleByUserName(userName: string) {
    this.userNameInForm = userName;
  }

  resetForm() {
    this.userFormData.name = '';
    this.userFormData.title = '';
  }
}
