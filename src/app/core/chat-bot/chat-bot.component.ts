import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { ChatBotService, Message } from '../services/chat-bot.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;

  constructor(
    public chat: ChatBotService,
    public dialog: MatDialog,
    public snackbarService: SnackbarService
    ) { }

  ngOnInit() {
    // ? appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable()
        .pipe(
          scan((acc, val) => acc.concat(val)) );
  }

  public sendMessage(): void {
    if (this.formValue !== '') {
    this.chat.converse(this.formValue);
    this.formValue = '';
    } else {
      this.snackbarService.openSnackBar(
        'Dude is still a kid, he cant understand the hidden meaning behind empty messages😋', 'red-snackbar');
    }
  }

  public closeDialogBox(): void {
    this.dialog.closeAll();
    this.snackbarService.openSnackBar(
      'Dude felt happy on a chat with you 😊😊😊\n His memory is weak so he stores no chat 😋',
      'green-snackbar');
  }

}
