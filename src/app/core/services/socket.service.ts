import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment.prod';
import { ChatListResponse } from '../../shared/models/chat-list-response.model';
import { MessageSocketEvent } from '../../shared/models/message-socket-event.model';
import { Message } from '../../shared/models/message.model';
import { Auth } from '../../shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private BASE_URL = environment.socketUrl;
  private socket;

  constructor() { }

  // ? Method to connect the users into socket
  public connectSocket(userId: string): void {
    this.socket = io(this.BASE_URL, { query: `userId=${userId}` });
  }

  // ? Method to emit the logout event.
  public logout(userId: string): Observable<Auth> {
    if (this.socket) {
      this.socket.emit('logout', userId);
      return new Observable(observer => {
        this.socket.on('logout-response', (data: Auth) => {
          observer.next(data);
        });
        this.socket.on('chat-list-response', (data) => {
          observer.next(data);
        });
      });
    } else {
      return new Observable();
    }
  }

  // ? Method to emit the logout event.
  public login(userId: string): Observable<Auth> {
    if (this.socket) {
      this.socket.emit('login', userId);
      return new Observable(observer => {
        this.socket.on('login-response', (data: Auth) => {
          observer.next(data);
        });
        this.socket.on('chat-list-response', (data) => {
          observer.next(data);
        });
      });
    } else {
      return new Observable();
    }
  }

  // ? Method to receive chat-list-response event (contains the list of users present in the db).
  public getChatList(userId: string = null): Observable<ChatListResponse> {
    if (this.socket) {
      if (userId !== null) {
        this.socket.emit('chat-list', { userId });
      }
      return new Observable(observer => {
        this.socket.on('chat-list-response', (data: ChatListResponse) => {
          observer.next(data);
        });
      });
    }
  }

  // ? Method to emit the add-messages event (Emits out the messages from socket).
  public sendMessage(message: MessageSocketEvent): void {
    if (this.socket) {
      this.socket.emit('add-message', message);
    }
  }

  // ? Method to receive add-message-response event (Receives the emitted messages from socket).
  public receiveMessages(): Observable<Message> {
    if (this.socket) {
      return new Observable(observer => {
        this.socket.on('add-message-response', (data) => {
          observer.next(data);
        });
      });
    }
  }
}
