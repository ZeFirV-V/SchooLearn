import {AuthService} from "../services/auth.service";
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from "rxjs";


@Injectable({ providedIn: 'root' })
export class AuthTeacherGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _auth: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this._auth.isAuthenticated()) {
      const user = this._auth.userValue;

      return of(true);
    } else {
      this._router.navigate(['/authorization'], {
        queryParams: {
          accessDenied: true,
        },
      }); //переход на логин
      return of(false);
    }
  }
}
