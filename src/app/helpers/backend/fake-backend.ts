import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import {Role} from "../../modules/auth/enums/role.enum";


const users = [
  { id: 1, email: 'Teacher@bk.ru', nickname: 'Teacher', password: 'admin', login: 'Admin', organization: 'school', role: Role.Teacher },
  { id: 2, email: 'Student@bk.ru', nickname: 'Student', password: 'user', login: 'Normal', organization: 'school', role: Role.Student }
];

const student = { id: 2, email: 'Student@bk.ru', nickname: 'Student', password: 'user', login: 'Normal', organization: 'school', role: Role.Student }

const companies = ["1", "2", "3"];

// const subjects = [
//   { id: 1, name: "math"},
//   { id: 2, name: "info"},
// ]


const task =
  {
    id: 1,
    subject: "math",
    level: 1,
    task: "123",
    price: 1,
  }

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        // case url.endsWith('/subjects') && method === 'GET':
        //   return getSubjects();
        case url.endsWith('/companies') && method === 'GET':
          return getCompanies();
        case url.endsWith('/subjects/math') && method === 'GET':
          return getTask();
        case url.endsWith('/users/1') && method === 'GET':
          return getUser();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }

    }

    // route functions
    function authenticate() {
      const { login, password } = body;
      const user = users.find(x => x.login === login && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        email: user.email,
        nickname: user.nickname,
        login: user.login,
        organization: user.organization,
        role: user.role,
        idToken: `fake-jwt-token.${user.id}`
      });
    }

    function getUser() {
      return ok(student);
    }
    //
    // function getSubjects() {
    //   return ok(subjects);
    // }

    function getCompanies() {
      return ok(companies);
    }

    function getTask() {
      return ok(task);
    }

    function getUsers() {
      if (!isAdmin()) return unauthorized();
      return ok(users);
    }

    function getUserById() {
      if (!isLoggedIn()) return unauthorized();

      // only admins can access other user records
      if (!isAdmin() && currentUser()?.id !== idFromUrl()) return unauthorized();

      const user = users.find(x => x.id === idFromUrl());
      return ok(user);
    }

    // helper functions

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body }))
        .pipe(delay(500)); // delay observable to simulate server api call
    }

    function unauthorized() {
      return throwError(() => ({ status: 401, error: { message: 'unauthorized' } }))
        .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function error(message: string) {
      return throwError(() => ({ status: 400, error: { message } }))
        .pipe(materialize(), delay(500), dematerialize());
    }

    function isLoggedIn() {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }

    function isAdmin() {
      return currentUser()?.role === Role.Teacher;
    }

    function currentUser() {
      if (!isLoggedIn()) return;
      const id = parseInt(headers.get('Authorization')!.split('.')[1]);
      return users.find(x => x.id === id);
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
