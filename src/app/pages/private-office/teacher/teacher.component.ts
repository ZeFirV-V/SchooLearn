import { Component } from '@angular/core';
import {InfoService} from "../../../modules/info-lk/info.service";
import {IInstitution} from "../../../modules/auth/interfaces/auth/auth-responce-user.interface";
import {Observable} from "rxjs";
import {IGroup} from "../../../modules/info-lk/info.interfases";
import {InfoLkFromTeacherService} from "../../../modules/info-lk/info-lk-from-teacher.service";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent {
  constructor(private infoLkFromTeacherService: InfoLkFromTeacherService) { }
  nickName?: string;
  organization?: IInstitution;
  groups$?: Observable<IGroup[]>;
  currentGroup?: number;
  id!: number;
  key$?: Observable<string>;
  nameTeacher$?: Observable<string>;

  ngOnInit() {
    let user = this.infoLkFromTeacherService.getInfoUser(true);
    this.nickName = user.nickName;
    this.organization = user.institution.name;
  }

  onFindGroup(event: any) {
    this.id = parseInt(event.target.value);
    this.key$ = this.infoLkFromTeacherService.getCode(this.id , true);
  }

  onGetNewCodeGroup() {
    this.key$ = this.infoLkFromTeacherService.getNewCode(this.id , true);
  }

  getGroupsSubject(id: number) {
    this.groups$ = this.infoLkFromTeacherService.getGroups(id, true);
  }
}
