import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { SocketService } from '../../core/services/socket.service';
import { DataShareService } from '../../core/services/data-share.service';
import { ChatListResponse } from '../../shared/models/chat-list-response.model';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  public mobile = false;
  public chatListLoading = true;
  public userId: string = null;
  public chatListUsers: User[] = [];
  public loadingChatMessage: string;
  private selectedUserId: string = null;

  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private dataShareService: DataShareService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn();
    this.chatListLoading = true;
    this.userId = this.dataShareService.getUserId();
    this.socketService.getChatList(this.userId).subscribe((chatListResponse: ChatListResponse) => {
      this.renderChatList(chatListResponse);
    });
    this.dataShareService.selectedUser.subscribe((user) => {
      if (user !== null) {
        this.selectedUserId = user.id;
      }
    });
    this.loadingChatListMessage();
    if (window.screen.width <= 720) { // 768px portrait
      this.mobile = true;
    }
    window.onresize = () => this.mobile = window.innerWidth <= 720;
  }

  public loadingChatListMessage(): void {
    if (this.chatListLoading && this.chatListUsers.length === 0) {
      this.loadingChatMessage = 'Loading your chat list.';
    } else {
      this.loadingChatMessage = 'No User Avilable to chat.';
    }
  }

  // ? Render all the users available in the data base for chat
  public renderChatList(chatListResponse: ChatListResponse): void {
    if (!chatListResponse.error) {
      if (chatListResponse.singleUser) {
        if (this.chatListUsers.length > 0) {
          this.chatListUsers = this.chatListUsers.filter((obj: User) => {
            return obj._id !== chatListResponse.chatList[0]._id;
          });
        }
        // ? Adding new online user into chat list array
        this.chatListUsers = this.chatListUsers.concat(chatListResponse.chatList);
      } else if (chatListResponse.userDisconnected) {
        const loggedOutUser = this.chatListUsers.findIndex((obj: User) => obj.id === chatListResponse.userid);
        if (loggedOutUser >= 0) {
          this.chatListUsers[loggedOutUser].online = 'N';
        }
      } else if (chatListResponse.userConnected) {
        const loggedInUser = this.chatListUsers.findIndex((obj: User) => obj.id === chatListResponse.userid);
        if (loggedInUser >= 0) {
          this.chatListUsers[loggedInUser].online = 'Y';
        }
      } else {
        // ? Updating entire chatlist if user logs in.
        this.chatListUsers = chatListResponse.chatList;
      }
      this.chatListLoading = false;
    } else {
      this.chatService.removeLocalStorage();
      this.chatListLoading = false;
    }
  }

  // ? To specify the particular selected user to chat with
  public isUserSelected(userId: string): boolean {
    if (!this.selectedUserId) {
      return false;
    }
    return this.selectedUserId === userId ? true : false;
  }

  // ? update the data service method with the particular selected user for establishing a room between the two users
  public selectedUser(user: User): void {
    this.selectedUserId = user.id;
    this.dataShareService.changeSelectedUser(user);
  }

}
