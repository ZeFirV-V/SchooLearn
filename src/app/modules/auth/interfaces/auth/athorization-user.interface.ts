import {Role} from "../../enums/role.enum";

export interface IAuthorizationUser {
  login: string;
  password: string;
  role: Role;
}
