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
  private readonly noApi: boolean= false;
  constructor(private http: HttpClient, private _router: Router) { }

  getTasks() {
  //  https://localhost:7079/task/assigned?groupId=12
  }

  getGroups(id: number, noApi: boolean = false): Observable<IGroup[]> {
    if(this.noApi) {
      const groups: IGroup[] = [{id: 1, name: "nameGroup-1"}, {id: 2, name: "nameGroup-2"}, {id: 3, name: "nameGroup-3"}]
      return of(groups);
    }
    return this.http.get<IGroup[]>(`https://localhost:7079/teacher/groups?subjectId=${id}`);
  }

  getSubjects(noApi: boolean = false): Observable<ISubject[]> {
    if(this.noApi) {
      const groups: ISubject[] = [{id: 1, name: "nameSubject-1"}, {id: 2, name: "nameSubject-2"}, {id: 3, name: "nameSubject-3"}]
      return of(groups);
    }
    return this.http.get<IGroup[]>(`https://localhost:7079/teacher/subjects`);
  }

  getCode(groupId: number, noApi: boolean = false): Observable<{code: string}>  {
    if(this.noApi) {
      return of({ code: "code-from-group"})
    }
    return this.http.get<{code: string}>(`https://localhost:7079/teacher/group/${groupId}/code`);
  }

  getNewCode(groupId: number, noApi: boolean = false) {
    if(this.noApi) {
      return of("code-from-group-new")
    }
    return this.http.get<string>(`https://localhost:7079/teacher/group/${groupId}/generate-code`);
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
    return this.http.post<boolean>('https://localhost:7079/teacher/subject/add', subject)
  }
  createGroup(subjectId: number, group: string) {
    let groupName: {name: string } = {
      name: group,
    }
    return this.http.post<boolean>(`https://localhost:7079/teacher/group/create?subjectId=${subjectId}`, groupName)
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
    return this.http.post<boolean>(`https://localhost:7079/task/add?groupId=${groupId}`, task)
  }
}
