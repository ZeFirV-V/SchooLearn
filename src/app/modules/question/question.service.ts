import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
export interface IDataQuestion {
  "nickname": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _http: HttpClient, private _router: Router) { }

  registerQuestion(data: IDataQuestion) {
    return this._http.post('https://www.schoolearn.store/account/send-message', data) //TODO: ПОМЕНЯТЬ ПУТЬ
  }
}
