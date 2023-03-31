// export interface IAuthUser {
//   email: string,
//   password: string,
//   returnSecureToken: boolean,
// }

export interface AuthResponseInterface {
  idToken: string,
  expiresIn: string,
}

export interface IAuthUser {
  name: string;
  email: string;
  password: string;
  phone: number;
  returnSecureToken: boolean,
}

export class AuthUser {
  public name: string;
  public email: string;
  public password: string;
  public phone: number;
  public returnSecureToken: boolean;

  constructor(data: IAuthUser) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.phone = data.phone;
    this.returnSecureToken = true;
  }
}
