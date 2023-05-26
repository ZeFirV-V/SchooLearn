import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {ICreateTask, IGroup, ISolvedTaskFullInfo, ISubject} from "./info.interfases";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {IAuthResponseUserInterface} from "../auth/interfaces/auth/auth-responce-user.interface";
import {Role} from "../auth/enums/role.enum";
import {ITask} from "../tasks/interfaces/task.itnerface";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InfoLkFromTeacherService {
  private readonly noApi: boolean = true;
  constructor(private http: HttpClient, private _router: Router) { }

  getGroups(id: number, noApi: boolean = false): Observable<IGroup[]> {
    if(this.noApi) {
      const groups: IGroup[] = [{id: 1, name: "nameGroup-1"}, {id: 2, name: "nameGroup-2"}, {id: 3, name: "nameGroup-3"}]
      return of(groups);
    }
    return this.http.get<IGroup[]>(`http://server.schoolearn.ru:8080/teacher/groups?subjectId=${id}`);
  }

  getSubjects(noApi: boolean = false): Observable<ISubject[]> {
    if(this.noApi) {
      const groups: ISubject[] = [{id: 1, name: "nameSubject-1"}, {id: 2, name: "nameSubject-2"}, {id: 3, name: "nameSubject-3"}]
      return of(groups);
    }
    return this.http.get<ISubject[]>(`http://server.schoolearn.ru:8080/task/subjects`);
  }

  getCode(groupId: number, noApi: boolean = false): Observable<{code: string}>  {
    if(this.noApi) {
      return of({ code: "code-from-group"})
    }
    return this.http.get<{code: string}>(`http://server.schoolearn.ru:8080/teacher/group/${groupId}/code`);
  }

  getNewCode(groupId: number, noApi: boolean = false) {
    if(this.noApi) {
      return of(true)
    }
    return this.http.get(`http://server.schoolearn.ru:8080/teacher/group/${groupId}/generate-code`);
  }

  getInfoUser(noApi: boolean = false) {
    if(this.noApi) {
      const user: IAuthResponseUserInterface = {
        email: "EMAIL",
        nickName: "nickName",
        login: "login",
        institution: {id: 1, name: "name institution"},
        role: Role.Teacher,
        token: "token"}
      return user;
    }
    let value = localStorage.getItem('user');
    if (value)
      return JSON.parse(value);
  }

  createSubject(subject: string) {
    return this.http.post<boolean>('http://server.schoolearn.ru:8080/teacher/subject/add', subject)
  }
  createGroup(subjectId: number, group: string) {
    let groupName: {name: string } = {
      name: group,
    }
    return this.http.post<boolean>(`http://server.schoolearn.ru:8080/teacher/group/create?subjectId=${subjectId}`, groupName)
      .pipe(    catchError(err => {
          throw 'error in source. Details: ' + err;
        })
      )
      .subscribe({
        next: x => console.log(x),
        error: err => console.log(err)
      });
  }

  addTask(groupId: number, task: ICreateTask) {
    //TODO: Поставить нужный апи
    return this.http.post<boolean>(`http://server.schoolearn.ru:8080/task/add?groupId=${groupId}`, task)
  }
}
