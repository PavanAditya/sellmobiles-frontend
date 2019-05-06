import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Response } from '../../shared/models/response.model';
import { Password } from '../../shared/models/password.model';
import { ResetPassword } from '../../shared/models/reset-password';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = false;
  public thirdParty = false;
  public token: string;
  public userProfile = new BehaviorSubject(null);
  public notifyError = new BehaviorSubject(null);
  private BASE_URL = environment.apiUrl + '/auth';
  private authStatusListner = new Subject<boolean>();

  constructor(
    private serviceHttp: HttpClient,
  ) { }

  // ? Checking the user is authenticated or not.
  public isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  // ? Notify all the subscribers whenever auth status is changed.
  public authStatusListener(): Observable<boolean> {
    return this.authStatusListner.asObservable();
  }

  // ? Sending post request to backend for sign up.
  public signUp(value: {}): Observable<Response> {
    return this.serviceHttp
      .post<Response>(`${this.BASE_URL}/signup`, value);
  }

  // ? Sending post request to backend for sign in.
  public signIn(data: string): Observable<Response> {
    return this.serviceHttp
      .post<Response>(`${this.BASE_URL}/signin`, data);
  }

  // ? Returning the token.
  public authToken(): string {
    return this.token;
  }

  public authData(): string | void {
    const token = localStorage.getItem('token');
    if (!token || token === undefined || token === 'undefined') {
      return;
    }
    return token;
  }

  // ? Sending post request to backend for logout.
  public logOut(): Observable<Response> {
    return this.serviceHttp
      .post<Response>(`${this.BASE_URL}/logout`, {});
  }

  public autoAuthUser(): void {
    const authInformation = localStorage.getItem('token');
    if (authInformation) {
      this.token = authInformation;
      this.isAuthenticated = true;
      this.authStatusListner.next(true);
    }
  }

  // ? Setting the token to local storage.
  public saveAuthData(token: string, userid: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userid', userid);
  }

  // ? Removing the token from local storage.
  public clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
  }

  // ? Callback funtion for google login.
  public googleLogin(): void {
    window.location.href = `${this.BASE_URL}/passport/google`;
    return;
  }

  // ? Callback funtion for github login.
  public githubLogin(): Observable<Response> {
    window.location.href = `${this.BASE_URL}/passport/github`;
    return;
  }

  // ? Function for forgot password.
  public forgotPassword(value: string): Observable<Response> {
    return this.serviceHttp.post<Response>(`${this.BASE_URL}/forgotpassword`, value);
  }

  // ? Toggling the password visibility.
  public visibility(password: Password): string {
    password.type = password.type === 'password' ? 'text' : 'password';
    if (password.type === 'password') {
      return 'visibility_off';
    } else {
      return 'visibility';
    }
  }

  // ? function for updating the password.
  public resetPassword(value: ResetPassword): Observable<Response> {
    return this.serviceHttp.put<Response>(`${this.BASE_URL}/resetpassword`, value);
  }

  // ? For listening the authentication status of the user for togging the profile option
  public listenToAuthentication(token, userid): void {
    this.authStatusListner.next(true);
    this.isAuthenticated = true;
    this.saveAuthData(token, userid);
  }
  // ? For logging out the user and removing the token
  public logOutUser(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    this.clearAuthData();
  }
  public isLoggedIn(): void {
    if (this.isAuthenticated) {
      this.authStatusListner.next(true);
    }
  }
}
