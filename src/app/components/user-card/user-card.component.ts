import { Component, Input, OnInit, Output, EventEmitter, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() isFormCard: boolean = false;
  @Input() userData: UserModel = {id: '', name: '', title: ''};

  @Output() addUser = new EventEmitter<UserModel>();
  @Output() updateUser = new EventEmitter<UserModel>();
  @Output() addSchedule = new EventEmitter<string>();
  userForm: FormGroup = this._fb.group({});
  editForm: FormGroup = this._fb.group({});
  isEditMode: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private dialogService: DialogService,
    private elementRef: ElementRef
    
  ) { }

  ngOnInit(): void {
    this.userForm = this._fb.group({
      name: [this.userData.name, Validators.required],
      title: [this.userData.title, Validators.required]
    });
    this.editForm = this._fb.group({
      id: this.userData.id,
      name: this.userData.name,
      title: this.userData.title
    });
  }

  onAddUser(userForm: FormGroup) {
    if (userForm.valid) {
      this.addUser.emit(userForm.value);
    }
  }

  onEdit() {
    this.isEditMode = !this.isEditMode;
  }

  onUpdate(editForm: FormGroup) {
    if (editForm.valid) {
      this.updateUser.emit(editForm.value);
      this.onEdit();
    };
  }

  onDeleteUser(id: string) {
    const event: CustomEvent = new CustomEvent('DeleteUserEvent', {
      bubbles: true,
      detail: { id: id }
    });

    this.elementRef.nativeElement.dispatchEvent(event);
  }

  onCancelDelete() {}

  addScheduleForUser(userName: string) {
    this.addSchedule.emit(userName);
  }
}
