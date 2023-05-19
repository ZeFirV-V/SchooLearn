import {IRegistrationUser} from "./registration-user.interface";
import {Role} from "../../enums/role.enum";

export interface IRegistrationStudent extends IRegistrationUser { }

export class RegistrationStudent implements IRegistrationStudent {
  constructor(
              public nickname: string,
              public login: string,
              public password: string,
              public repeatPassword: string,
              public email: string,
              public role: Role) {}
}

