import {Injectable} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private _auth: AuthService,
              private _router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._auth.token != null) {
      req = req.clone({
        setHeaders: {
          Authorization: this._auth.token
        }
      });
    }
    return next.handle(req);
  }
}
