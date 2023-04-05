import {Role} from "../../enums/role.enum";

export interface IAuthResponseUserInterface {
  nickname: string;
  login: string;
  role: Role;
  organization: string;
  idToken: string,
  expiresIn?: string,
}
