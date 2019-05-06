import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isAuthenticated = false;
  public user: User;
  private BASE_URL = environment.apiUrl;
  private urlGetUser = `${this.BASE_URL}/users/details/`;
  private urlGetSelectedUser = `${this.BASE_URL}/users/selected/details/`;
  private urlUpdateUser = `${this.BASE_URL}/users/update/`;
  private urlDeleteUser = `${this.BASE_URL}/users/delete/`;
  private urlGetboughtMobiles = `${this.BASE_URL}/mobiles/boughtMobiles/`;
  private urlGetsoldMobiles = `${this.BASE_URL}/mobiles/soldMobiles/`;
  private authStatusListner = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  public isUserAuthenticated(): boolean {
      return this.isAuthenticated;
    }
  public authStatusListener(): Observable<boolean> {
      return this.authStatusListner.asObservable();
    }

  public userDetails(userName: string): Observable<Response> {
    return this.http.get<Response>(this.urlGetUser + userName);
  }

  public userDetailsByUserName(userName: string): Observable<Response> {
    return this.http.get<Response>(this.urlGetSelectedUser + userName);
  }

  public updateUserDetails(user: User): Observable<Response> {
    return this.http.put<Response>(this.urlUpdateUser, user);
  }

  public deleteUserDetails(email: string): Observable<Response> {
    return this.http.delete<Response>(this.urlDeleteUser + email);
  }

  // ? Logging out the user.
  public logOutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
  }

  public boughtMobiles(userName: string): Observable<Response> {
    return this.http.get<Response>(this.urlGetboughtMobiles + userName);
  }

  public soldMobiles(userName: string): Observable<Response> {
    return this.http.get<Response>(this.urlGetsoldMobiles + userName);
  }
}
