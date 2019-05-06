import { UserResponse } from './user-response.model';
export interface RegisteredUser {
    message: string;
    data: UserResponse[];
    status: number;
  }
