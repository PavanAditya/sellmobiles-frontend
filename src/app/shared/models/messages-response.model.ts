import { Message } from './message.model';

export interface MessagesResponse {
  error: boolean;
  messages: Message[];
}
