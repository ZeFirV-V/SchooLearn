import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private _auth: AuthService,
              private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if(this._auth.isAuthenticated()) {
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

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }
}

// import { Injectable } from "@angular/core";
// import { CanActivate, Router } from "@angular/router";
// import { Observable, of, switchMap } from "rxjs";
// import { AuthService } from '../services/auth.service'
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private _auth: AuthService,
//     private _router: Router,
//   ) { }
//
//   public canActivate(): Observable<boolean> {
//     return this._auth.isValidToken()
//       .pipe(
//         switchMap((res: boolean) => {
//             if (!res) {
//               this._router.navigateByUrl("/account");
//             }
//             return of(res)
//           }
//         )
//       )
//   }
// }
