import {Injectable} from "@angular/core";
import {IUser} from "./user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient) { }
  login(user: IUser): Observable<{token: string}> {
    return this._http.post<{token: string}>('https://localhost:7238/api/Token', user)
  }

  register() { }
}
