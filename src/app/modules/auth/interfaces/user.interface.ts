import {Role} from "../enums/role.enum";


export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  role: Role;
  token?: string;
}
