import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, Subject, throwError } from "rxjs";
import {tap} from "rxjs/operators"
import {Router} from "@angular/router";
import { IAuthorizationUser} from "../interfaces/auth/athorization-user.interface";
import {IAuthResponseUserInterface} from "../interfaces/auth/auth-responce-user.interface";
import {Role } from "../enums/role.enum";
import {IRegistrationOrganization} from "../interfaces/registration/registration-organization.interface";

import {IRegistrationUser} from "../interfaces/registration/registration-user.interface";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  public error$: Subject<string> = new Subject<string>();

  constructor(private _http: HttpClient, private _router: Router) { }

  registerStudent(user: IRegistrationUser): Observable<boolean> {
    return this._http.post<boolean>('/regist', user) //TODO: ПОМЕНЯТЬ ПУТЬ
  }

  registerTeacher(user: IRegistrationUser): Observable<boolean> {
    return this._http.post<boolean>('/regist', user) //TODO: ПОМЕНЯТЬ ПУТЬ
  }

  registerCompany(company: IRegistrationOrganization): Observable<boolean> {
    return this._http.post<boolean>('/registCompany', company)
  }

  login(user: IAuthorizationUser): Observable<IAuthResponseUserInterface> {
    return this._http.post<IAuthResponseUserInterface>(`https://localhost:7079/account/login`, user)
      .pipe(
        tap((value: IAuthResponseUserInterface) => {
          this.setToken(value);
        }),
        catchError(this.handleError.bind(this))
      )
  }

  private roleConverter(roleInNumber: number) {
    switch (roleInNumber){
      case 1:
      {
        break;
      }
      case 2: {
        break;
      }
      case 3: {
        break;
      }
      case 4: {
        break;
      }
      case 5: {
        break;
      }
      default: {
        console.error("ошибка в роли в методе roleConverter");
        break;
      }
    }
  }

  private setToken(response: IAuthResponseUserInterface | null): void {
    if (response) {
      console.log(response);

      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('role', response.role);
      localStorage.setItem('token', response.token.toString());
    } else {
      localStorage.clear();
    }
  }

  navigateLk(role: Role): void {
    switch (role) {
      case Role.Teacher:
        this._router.navigate(['/lk-teacher']).then(); // переход на лк
        break;
      case Role.Student:
        this._router.navigate(['/lk-student']).then(); // переход на лк
        break;
    }
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email нет');
        break;
    }
    return throwError(error);
  }

  get token() : string | null {
    return localStorage.getItem('token');
  }

  get role() : string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null); //TODO: сделать переадресацию на авторизацию
  }
}
