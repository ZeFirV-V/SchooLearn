import {Role} from "../../enums/role.enum";

export interface IRegistrationUser {
  role: Role;
  nickname: string;
  login: string;
  password: string;
  email: string;
}
