import { MobileUploaded } from './mobile-uploaded.model';
export interface UserResponse {
  mobilesuploaded: MobileUploaded[];
  _id: string;
  firstName: string;
  lastName: string;
  location: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
  tokens: string[];
  userName: string;
  loginMethod?: string;
  google?: string;
  github?: string;
  socketId?: string;
  online?: string;
  __v: number;
  date?: string;
}
