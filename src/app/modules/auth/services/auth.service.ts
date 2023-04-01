import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import {tap} from "rxjs/operators"
import {environment} from "../../../../environments/environment";
import {AuthResponseInterface, IAuthUser} from "../interfaces/auth-response.interface";
import {IUser} from "../../../components/forms/models/user";

@Injectable()
export class AuthService {
  private _token: string | null = null;

  constructor(private _http: HttpClient) { }

  register(user: IAuthUser): Observable<IAuthUser> {
    return this._http.post<IAuthUser>('/regist', user) //TODO: ПОМЕНЯТЬ ПУТЬ
  }

  login(user: IAuthUser): Observable<AuthResponseInterface> {
    //TODO: добавить прохи --proxy-config proxy.conf.json
    return this._http.post<AuthResponseInterface>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap((value) => {
          this.setToken(value);
        })
      )
  }

  setToken(response: AuthResponseInterface | null): void { //Сделал приватным, надеюсь ничего не упало )) упало))
    if (response) {
      const expDate: Date = new Date(new Date().getTime() + parseInt(response.expiresIn) * 1000);
      localStorage.setItem('token-exp', expDate.toString());
      this._token = response.idToken;
      localStorage.setItem('token', response.idToken);
    } else {
      localStorage.clear();
      this._token = null;
    }
  }

  get token() : string | null {
    const strDateExp: string | null = localStorage.getItem('token-exp');
    if (strDateExp === null) {
      return null;
    }
    if (new Date() > new Date(strDateExp)) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean { //TODO: сделать проверку валидности токена
    // return !!this._token;
    return this.token !== null;
  }

  logout() {
    this.setToken(null);
  }

  // isAuthenticated(): Observable<boolean> {
  //   if(!this._token) {
  //     return of(false);
  //   }
  //   return this._http.get("/api/users/isAuth") //TODO: ПОМЕНЯТЬ URL
  //     .pipe(
  //       switchMap((res: any) => {
  //         return of(res.success);
  //       }),
  //       catchError(() => {
  //         return of(false);
  //       })
  //     )
  // }

}
