import {Role} from "../enums/role.enum";

export interface RegistrationUser {
  role: Role;
  nickname: string;
  organization: string;
  login: string;
  password: string;
  returnSecureToken?: boolean;
  checkReturnSecureToken(): boolean;
}
