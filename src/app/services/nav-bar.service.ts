import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  private nameChange = new BehaviorSubject<string>('dashboard');
  navName$ = this.nameChange.asObservable();
  constructor() {}

  changeNavBar(name: string){
    this.nameChange.next(name);
  }
}
