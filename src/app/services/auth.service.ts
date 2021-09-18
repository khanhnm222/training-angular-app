import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

export interface UserInfo {
  userName: string;
  password: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private updateUser = new BehaviorSubject<UserInfo>({userName: '', password: ''});
  user$ = this.updateUser.asObservable();
  constructor() { }

  get currentUser() {
    return of({name: 'khanhnguyenm@gmail.com', password: 'KhanhNguyen123'});
    // return of(null);
  }

  setUser(user: UserInfo){
    this.updateUser.next(user);
  }
}
