import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Message } from '../../shared/models/message.model';
import { ChatService } from '../../core/services/chat.service';
import { SocketService } from '../../core/services/socket.service';
import { DataShareService } from '../../core/services/data-share.service';
import { MessagesResponse } from '../../shared/models/messages-response.model';
import { FormService } from '../../core/services/form.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  public messageLoading = true;
  public userName: string = null;
  public selectedUser: User = null;
  public messages: Message[] = [];
  public messageForm: FormGroup;
  public loadingConverstionText: string;
  private userId: string = null;
  @ViewChild('messageThread', { static: false }) private messageContainer: ElementRef;

  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private formService: FormService,
    private dataShareService: DataShareService,
    private snackBarService: SnackbarService
  ) {
    this.messageForm = this.formService.createMessageForm();
  }

  ngOnInit() {
    this.userId = this.dataShareService.getUserId();
    this.userName = this.dataShareService.getUserName();
    this.listenForMessages();
    this.dataShareService.selectedUser.subscribe((selectedUser: User) => {
      if (selectedUser !== null) {
        this.selectedUser = selectedUser;
        this.getMessages(this.selectedUser.id);
      }
      this.loadConversationText();
    });
  }

  public loadConversationText(): void {
    if (this.selectedUser !== null && this.selectedUser.firstName) {
      this.loadingConverstionText = 'Loading Messages';
    } else {
      this.loadingConverstionText = 'Select a User to chat.';
    }
  }

  // ? Align the messages to right and left according to sender
  public alignMessage(userId: string): boolean {
    return this.userId === userId ? false : true;
  }

  // ? Method for fetching all the pre-existing messages in this conversation
  public getMessages(toUserId: string): void {
    this.messageLoading = true;
    this.chatService
      .getMessages({ userId: this.userId, toUserId })
      .subscribe((response: MessagesResponse) => {
        this.messages = response.messages;
        this.messageLoading = false;
      });
  }

  // ? Check and listen for any incomming messages
  public listenForMessages(): void {
    this.socketService
      .receiveMessages()
      .subscribe((socketResponse: Message) => {
        if (
          this.selectedUser !== null &&
          this.selectedUser.id === socketResponse.fromUserId
        ) {
          this.messages = [...this.messages, socketResponse];
        }
      });
  }

  // ? function for the Enter key to send the typed message
  public sendMessage(event): void {
    if (event.keyCode === 13) {
      const message = this.messageForm.controls[`message`].value.trim();
      if (message === '' || message === undefined || message === null) {
        this.snackBarService.openSnackBar(
          `Message can't be empty`,
          'red-snackbar'
        );
      } else if (this.userId === '') {
        this.snackBarService.openSnackBar(
          `Select a user to chat.`,
          'red-snackbar'
        );
      } else if (this.selectedUser._id === '') {
        this.snackBarService.openSnackBar(
          `Select a user to chat.`,
          'red-snackbar'
        );
      } else {
        this.sendAndUpdateMessages({
          fromUserId: this.userId,
          message: message.trim(),
          toUserId: this.selectedUser.id
        });
      }
    }
  }

  // ? Sending and updating messages
  public sendAndUpdateMessages(message: Message): void {
    try {
      this.messageForm.disable();
      this.socketService.sendMessage(message);
      this.messages = [...this.messages, message];
      this.messageForm.reset();
      this.messageForm.enable();
    } catch (error) {
      this.snackBarService.openSnackBar(
        error,
        'red-snackbar'
      );
    }
  }

}
