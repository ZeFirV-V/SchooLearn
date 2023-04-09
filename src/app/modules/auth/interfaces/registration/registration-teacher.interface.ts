import {IRegistrationUser} from "./registration-user.interface";

export interface RegistrationTeacher  extends IRegistrationUser {
  key: string;
  email: string;
}
