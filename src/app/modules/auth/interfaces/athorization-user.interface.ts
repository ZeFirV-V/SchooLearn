import {Role} from "../enums/role.enum";

export interface AuthorizationUser {
  login: string;
  password: string;
  role: Role;
}
