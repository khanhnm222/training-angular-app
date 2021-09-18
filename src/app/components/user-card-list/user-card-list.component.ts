import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-card-list',
  templateUrl: './user-card-list.component.html',
  styleUrls: ['./user-card-list.component.scss']
})
export class UserCardListComponent implements OnInit {

  @Input() userList: UserModel[] = [];
  @Input() isAddNew: boolean = false;
  @Input() user: UserModel = {id: '',name: '', title: ''};

  @Output() create = new EventEmitter<UserModel>();
  @Output() update = new EventEmitter<UserModel>();
  @Output() addSchedule = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onAdd(formData: UserModel) {
    this.create.emit(formData);
  }

  onUpdate(formData: UserModel) {
    this.update.emit(formData);
  }

  onAddSchedule(userName: string) {
    this.addSchedule.emit(userName);
  }
}
