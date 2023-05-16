import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";
import {catchError, Observable, of} from "rxjs";
import {IAppTask, IGroup, ISolvedTask, ISolvedTaskFullInfo} from "./info.interfases";

export interface ISubjectFromLK {
  id: number;
  name: string;
  teacher: string;
  class: string;
  ratingNumber: number;
  score: number;
  tasksCompleted: number;
}

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  subject: any = {}
  private subjectUrl = `${environment.apiUrl}/subjects`;  // URL to web api
  constructor(private http: HttpClient, private _router: Router) { }

  getGroups(): Observable<IGroup[]> {
    const groups = localStorage.getItem("groupsInfo");
    const groupsInLocal: IGroup[] = groups !== null ? JSON.parse(groups) : [];
    if (groupsInLocal && groupsInLocal.length !== 0) {
      return of(groupsInLocal)
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);


    return this.http.get<IGroup[]>(`https://localhost:7079/student/groups`, { headers }).pipe(
      tap((data) => {
        localStorage.setItem("groupsInfo", JSON.stringify(data));
      })
    );
  }

  getGroupInfo(id: number): Observable<string> {
    const group = localStorage.getItem("groupInfo");
    const groupInfoInLocal: string = group !== null ? JSON.parse(group) : "";
    if (groupInfoInLocal && groupInfoInLocal !== "") {
      return of(groupInfoInLocal)
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);

    return this.http.get<string>(`https://localhost:7079/student/groups/${id}`, { headers }).pipe(
      tap((data) => {
        localStorage.setItem("groupInfo", JSON.stringify(data));
      })
    );
  }

  getSolvedTasksInfo(id: number): Observable<ISolvedTask[]> {
    const solvedTasks = localStorage.getItem("solvedTasks");
    const solvedTasksInLocal: ISolvedTask[] = solvedTasks !== null ? JSON.parse(solvedTasks) : [];
    if (solvedTasksInLocal && solvedTasksInLocal.length !== 0) {
      return of(solvedTasksInLocal)
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);

    return this.http.get<ISolvedTask[]>(`https://localhost:7079/task/solved?groupId=${id}`, { headers }).pipe(
      tap((data) => {
        localStorage.setItem("solvedTasks", JSON.stringify(data));
      })
    );
  }

  getSolvedTaskFullInfo(id: number): Observable<ISolvedTaskFullInfo> {
    const solvedTaskFullInfo = localStorage.getItem("solvedTaskFullInfo");
    const solvedTaskInLocal: ISolvedTaskFullInfo = solvedTaskFullInfo !== null ? JSON.parse(solvedTaskFullInfo) : {};
    if (solvedTaskInLocal && Object.entries(solvedTaskInLocal).length === 0) {
      return of(solvedTaskInLocal)
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);

    return this.http.get<ISolvedTaskFullInfo>(`https://localhost:7079/task/solved?groupId=${id}`, { headers }).pipe(
      tap((data) => {
        localStorage.setItem("solvedTaskFullInfo", JSON.stringify(data));
      })
    );
  }

  getAppTasks(id: number): Observable<IAppTask[]> {
    const appTasks = localStorage.getItem("appTasks");
    const appTasksInLocal: IAppTask[] = appTasks !== null ? JSON.parse(appTasks) : [];
    if (appTasksInLocal && appTasksInLocal.length !== 0) {
      return of(appTasksInLocal)
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);

    return this.http.get<IAppTask[]>(`https://localhost:7079/task/current?groupId=${id}`, { headers }).pipe(
      tap((data) => {
        localStorage.setItem("appTasks", JSON.stringify(data));
      })
    );
  }

  getInfoStudent() {
    let value = localStorage.getItem('user');
    if (value)
      return JSON.parse(value);
  }

  // getInfoSubjectFromStudent(subject: string): Observable<ISubjectFromLK> {
  //   const subjects = localStorage.getItem("subjectsInfo");
  //   const subjectsInLocal: Record<string, ISubjectFromLK> = subjects !== null ? JSON.parse(subjects) : {};
  //   if (subjectsInLocal && subjectsInLocal[subject]) {
  //     return of(subjectsInLocal[subject])
  //   }
  //
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders()
  //     .set('Authorization', 'Bearer ' + token);
  //
  //   const body = {
  //     subject: subject
  //   };
  //
  //   return this.http.post<ISubjectFromLK>(`${this.subjectUrl}`, body, { headers }).pipe(
  //     tap((data) => {
  //       subjectsInLocal[subject] = data;
  //       localStorage.setItem("subjectsInfo", JSON.stringify(subjectsInLocal));
  //     })
  //   );
  // }
}
