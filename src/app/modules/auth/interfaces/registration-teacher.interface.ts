import {RegistrationUser} from "./registration-user.interface";

export interface RegistrationTeacher  extends RegistrationUser {
  key: string;
  email: string;
}
