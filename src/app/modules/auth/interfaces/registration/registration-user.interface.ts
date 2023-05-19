import {Role} from "../../enums/role.enum";

export interface IRegistrationUser {
  nickname: string;
  login: string;
  password: string;
  repeatPassword: string,
  email: string;
  role: Role;
}
