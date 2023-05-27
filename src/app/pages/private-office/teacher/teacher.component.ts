import { Component } from '@angular/core';
import {InfoService} from "../../../modules/info-lk/info.service";
import {IInstitution} from "../../../modules/auth/interfaces/auth/auth-responce-user.interface";
import {Observable} from "rxjs";
import {IGroup} from "../../../modules/info-lk/info.interfases";
import {InfoLkFromTeacherService} from "../../../modules/info-lk/info-lk-from-teacher.service";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent {
  constructor(private infoLkFromTeacherService: InfoLkFromTeacherService, private router: Router) { }
  nickName?: string;
  organization?: IInstitution;
  groups$?: Observable<IGroup[]>;
  currentGroup?: number;
  id: number = 0;
  key$?: Observable<{code: string}>;
  nameTeacher$?: Observable<string>;

  ngOnInit() {
    let user = this.infoLkFromTeacherService.getInfoUser(true);
    this.nickName = user.nickName;
    this.organization = user.institution.name;
    let id = sessionStorage.getItem("id-teacher-group");
    if(id) {
      this.id = JSON.parse(id);
    }

    let idSubject = sessionStorage.getItem("id-student-subject");
    if(idSubject) {
      this.groups$ = this.infoLkFromTeacherService.getGroups(JSON.parse(idSubject), true);
    }
    this.onFindGroup()
  }

  onFindGroup() {
    sessionStorage.setItem("id-teacher-group", JSON.stringify(this.id));
    if (this.id) {
      this.key$ = this.infoLkFromTeacherService.getCode(this.id , true);
    }
  }

  onGetNewCodeGroup() {
    this.infoLkFromTeacherService.getNewCode(this.id).subscribe(
      (data) => {
        console.log(data)
        this.key$ = this.infoLkFromTeacherService.getCode(this.id);
      }
    )
  }

  getGroupsSubject(id: number) {
    this.groups$ = this.infoLkFromTeacherService.getGroups(id, true);
  }

  qwe() {
    this.router.navigate(["tasks/create"]);
  }
}
