import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router} from "@angular/router";
import { environment } from "../../../environments/environment";
import { tap } from "rxjs/operators";
import {never, Observable, of} from "rxjs";
import { IAppTask, IGroup, ISolvedTask, ISolvedTaskFullInfo } from "./info.interfases";
import {IAuthResponseUserInterface} from "../auth/interfaces/auth/auth-responce-user.interface";
import {Role} from "../auth/enums/role.enum";

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  subject: any = {}
  constructor(private http: HttpClient, private _router: Router) { }

  getGroups(noApi: boolean = false): Observable<IGroup[]> {
    if(noApi) {
      const groups: IGroup[] = [{id: 1, name: "nameGroup-1"}, {id: 2, name: "nameGroup-2"}, {id: 3, name: "nameGroup-3"}]
      return of(groups);
    }
    return this.http.get<IGroup[]>(`https://localhost:7079/student/groups`);
  }

  getGroupInfo(id: number, noApi: boolean = false): Observable<string> {
    if(id === 0) {
      return of();
    }
    if(noApi) {
      return of("teacherName")
    }
    const group = localStorage.getItem("groupInfo");
    const groupInfoInLocal: Record<string, string> = group !== null ? JSON.parse(group) : {};
    if (groupInfoInLocal && Object.entries(groupInfoInLocal).length !== 0 && id.toString() in groupInfoInLocal) {
      return of(groupInfoInLocal[id.toString()])
    }

    return this.http.get<string>(`https://localhost:7079/student/groups/${id}`)
      .pipe(
        tap((data) => {
          groupInfoInLocal[id.toString()] = data;
          localStorage.setItem("groupInfo", JSON.stringify(groupInfoInLocal));
        })
      );
  }

  getSolvedTasksInfo(id: number, noApi: boolean = false): Observable<ISolvedTask[]> {
    if(id === 0) {
      return of();
    }
    if (noApi) {
      return of([{id: 1, name: "name-1", scores: 1 }, {id: 2, name: "name-2", scores: 1 }, {id: 3, name: "name-3", scores: 1 }])
    }
    return this.http.get<ISolvedTask[]>(`https://localhost:7079/task/solved?groupId=${id}`);
  }

  getSolvedTaskFullInfo(id: number, noApi: boolean = false): Observable<ISolvedTaskFullInfo> {
    if(id === 0) {
      return of();
    }
    if (noApi) {
      const tasksInfo: ISolvedTaskFullInfo = {
        id: 1,
        name: "name-1",
        description: "description-1",
        difficulty: "difficulty-1",
        subject: "subject-1",
        receivedAnswer: "receivedAnswer-1",
        deadline: new Date(),
        scores: 1
      }
      return of(tasksInfo);
    }

    const solvedTaskFullInfo = localStorage.getItem("solvedTaskFullInfo");
    const solvedTaskInLocal: ISolvedTaskFullInfo = solvedTaskFullInfo !== null ? JSON.parse(solvedTaskFullInfo) : {};
    if (solvedTaskInLocal && Object.entries(solvedTaskInLocal).length !== 0 && solvedTaskInLocal.id === id) {
      return of(solvedTaskInLocal)
    }

    return this.http.get<ISolvedTaskFullInfo>(`https://localhost:7079/task/solved?groupId=${id}`).pipe(
      tap((data) => {
        localStorage.setItem("solvedTaskFullInfo", JSON.stringify(data));
      })
    );
  }

  getAppTasks(id: number, noApi: boolean = false): Observable<IAppTask[]> {
    if(id === 0) {
      return of();
    }
    if(noApi) {
      const tasksInfo: IAppTask[] = [{
        id: 1,
        name: "name-1",
        description: "description-1",
        difficulty: "difficulty-1",
        subject: "subject-1",
        deadline: new Date(),
      }, {
        id: 2,
        name: "name-2",
        description: "description-2",
        difficulty: "difficulty-2",
        subject: "subject-2",
        deadline: new Date(),
      }, {
        id: 3,
        name: "name-3",
        description: "description-3",
        difficulty: "difficulty-3",
        subject: "subject-3",
        deadline: new Date(),
      }
      ]

      if(id === 1) {
        const tasksInfo2: IAppTask[] = [{
          id: 1,
          name: "name-1",
          description: "description-1",
          difficulty: "difficulty-1",
          subject: "subject-1",
          deadline: new Date(),
        }]
        return of(tasksInfo2);
      }
      return of(tasksInfo);

    }
    return this.http.get<IAppTask[]>(`https://localhost:7079/task/current?groupId=${id}`);
  }

  getInfoStudent(noApi: boolean = false) {
    if(noApi) {
      const user: IAuthResponseUserInterface = {
        email: "EMAIL",
        nickName: "nickName",
        login: "login",
        institution: {id: 1, name: "name institution"},
        role: Role.Student,
        token: "token"}
      return user;
    }
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
