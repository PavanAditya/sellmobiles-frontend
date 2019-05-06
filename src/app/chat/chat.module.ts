import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

@NgModule({
  declarations: [
    ChatComponent,
    ChatListComponent,
    ConversationComponent,
    ChatRoomComponent
  ],
  imports: [
    SharedModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
