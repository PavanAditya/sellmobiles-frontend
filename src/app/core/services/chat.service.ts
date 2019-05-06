import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { MessageRequest } from '../../shared/models/message-request.model';
import { MessagesResponse } from '../../shared/models/messages-response.model';
import { UserSessionCheck } from '../../shared/models/user-session-check.model';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private BASE_URL = environment.apiUrl + '/chat/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(
    private http: HttpClient,
    private snackBarService: SnackbarService
  ) { }

  // ? Fetches the userId from local storage
  public getUserId(): void {
    localStorage.getItem('userid');
  }

  // ? removes the username and userid from local storage after user logs out
  public removeLocalStorage(): void {
    localStorage.removeItem('userid');
  }

  // ? For Checking the session of the user if online or not
  public userSessionCheck(): Observable<boolean> {
    const userId = localStorage.getItem('userid');
    return new Observable(observer => {
      if (userId !== null && userId !== undefined) {
        this.http.post(`${this.BASE_URL}usersessioncheck`, JSON.stringify({ userId }), this.httpOptions)
          .subscribe(
            (response: UserSessionCheck) => {
              if (response.error) {
                return false;
              }
              localStorage.setItem('username', response.username);
              observer.next(true);
            }, (error) => {
              observer.next(false);
            });
      } else {
        observer.next(false);
      }
    });
  }

  // ? For getting all the existing messages between the mentioned 'from' and 'to' users
  public getMessages(params: MessageRequest): Observable<MessagesResponse> {
    return this.http.post(`${this.BASE_URL}getmessages`, params, this.httpOptions).pipe(
      map(
        (response) => {
          if (response.hasOwnProperty('data')) {
            return response[`data`];
          }
        },
        (error) => {
          this.snackBarService.openSnackBar(
            error,
            'red-snackbar'
          );
          throw error;
        }
      )
    );
  }

}
