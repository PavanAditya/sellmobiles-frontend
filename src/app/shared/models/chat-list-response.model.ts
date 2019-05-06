import { User } from './user.model';

export interface ChatListResponse {
  chatList: User[];
  error: boolean;
  singleUser: boolean;
  userDisconnected: boolean;
  userConnected: boolean;
  userid: string;
}
