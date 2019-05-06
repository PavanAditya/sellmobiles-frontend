import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  public userId: string = null;
  public userName: string = null;
  public user = new BehaviorSubject(null);
  public selectedUser: Observable<User> = this.user.asObservable();

  constructor() { }

  // ? Operates on behaviour subject and changes the selected user to chat with
  public changeSelectedUser(oppositeUser: User): void {
    this.user.next(oppositeUser);
  }

  // ? Fetches the userId of the particular logged in operating user
  public getUserId(): string {
    if (this.userId === null) {
      this.userId = localStorage.getItem('userid');
    }
    return this.userId;
  }

  // ? Fetches the userName of the particular logged in operating user
  public getUserName(): string {
    if (this.userName === null) {
      this.userName = localStorage.getItem('username');
    }
    return this.userName;
  }
}
