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
import {ISolvedTaskFullInfo} from "../../info-lk/info.interfases";

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  public error$: Subject<string> = new Subject<string>();

  constructor(private _http: HttpClient, private _router: Router) { }

  registerStudent(user: IRegistrationUser): Observable<boolean> {
    return this._http.post<boolean>('http://server.schoolearn.ru:8080/account/register', user) //TODO: ПОМЕНЯТЬ ПУТЬ
  }
  //
  registerTeacher(user: IRegistrationUser): Observable<boolean> {
    return this._http.post<boolean>('http://server.schoolearn.ru:8080/account/register', user) //TODO: ПОМЕНЯТЬ ПУТЬ
  }

  registerAdmin(user: IRegistrationUser): Observable<boolean> {
    return this._http.post<boolean>('http://server.schoolearn.ru:8080/account/register', user) //TODO: ПОМЕНЯТЬ ПУТЬ
  }

  registerCompany(company: IRegistrationOrganization): Observable<boolean> {
    return this._http.post<boolean>('http://server.schoolearn.ru:8080/institution/create', company)
  }

  getInstitution(): Observable<{ id: number, name: string }[]> {
    return this._http.get<{ id: number, name: string }[]>(`http://server.schoolearn.ru:8080/institution/confirmed`)
  }

  login(user: IAuthorizationUser): Observable<IAuthResponseUserInterface> {
    return this._http.post<IAuthResponseUserInterface>(`http://server.schoolearn.ru:8080/account/login`, user)
      .pipe(
        tap((value: IAuthResponseUserInterface) => {
          const user:IAuthResponseUserInterface = value;
          user.role = this.roleConverter(parseInt(value.role));
          this.setToken(user);
        }),
        catchError(this.handleError.bind(this))
      )
  }

  private roleConverter(roleInNumber: number): Role {
    console.log(roleInNumber)
    switch (roleInNumber){
      case 3: {
        return Role.Teacher;
      }
      case 4: {
        return Role.Student;
      }
      case 2: {
        return Role.AdministratorTeacher;
      }
      default: {
        console.error("ошибка в роли в методе roleConverter");
        alert("ошибка авторизации")
        return Role.NonUser;
      }
    }
  }

  private setToken(response: any | null): void {
    if (response) {
      // const user:IAuthResponseUserInterface = response;
      // user.role = this.roleConverter(parseInt(response.role));
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('role', response.role);
      localStorage.setItem('token', response.token.toString());
    } else {
      localStorage.clear();
      sessionStorage.clear();
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
    this._router.navigate(["/"]);
    this.setToken(null); //TODO: сделать переадресацию на авторизацию
  }
}
