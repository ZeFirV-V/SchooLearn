import { Injectable } from '@angular/core';
import { Observable, of} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { IAppTakFullInfo } from "../info-lk/info.interfases";

export interface IRatingUser {
  place: number;
  nickname: string;
  scores: number;
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  constructor(private http: HttpClient, private _router: Router) { }
  sort(subjectId: number, groupId: number,fromDate: Date,  toDate: Date): Observable<IRatingUser[]> {
    return of([
      {
        place: 1,
        nickname: "string",
        scores: 1,
      }
    ])
    // return this.http.get<IRatingUser[]>(`http://server.schoolearn.ru:8080/rating/get?groupId=${subjectId}&subjectId=${groupId}&from=${fromDate}&to=${toDate}`);
  }

  getMyRating(subjectId: number, groupId: number,fromDate: Date,  toDate: Date): Observable<IRatingUser> {
    return of(
      {
        place: 1,
        nickname: "string",
        scores: 1,
      }
    )
    // return this.http.get<IRatingUser>(`http://server.schoolearn.ru:8080/rating/my?groupId=${subjectId}&subjectId=${groupId}&from=${fromDate}&to=${toDate}`);
  }
}
