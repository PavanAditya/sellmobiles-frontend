import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../core/services/socket.service';
import { DataShareService } from '../../core/services/data-share.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  public userId: string;
  public username: string;
  public overlayDisplay: boolean;

  constructor(
    private socketService: SocketService,
    private dataShareService: DataShareService,
    private snackBarService: SnackbarService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn();
    this.userId = this.dataShareService.getUserId();
    this.username = this.dataShareService.getUserName();
    this.establishSocketConnection();
  }

  // ? making socket connection by passing UserId.
  public establishSocketConnection(): void {
    try {
      if (this.userId === '' || typeof this.userId === 'undefined' || this.userId === null) {
        this.snackBarService.openSnackBar(
          'Socket-id not passed',
          'red-snackbar'
        );
      } else {
        this.socketService.connectSocket(this.userId);
        this.overlayDisplay = false;
      }
    } catch (error) {
      this.snackBarService.openSnackBar(
        'Something went wrong',
        'red-snackbar'
      );
    }
  }

}
