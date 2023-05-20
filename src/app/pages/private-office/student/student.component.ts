import { Component } from '@angular/core';
import {InfoService} from "../../../modules/info-lk/info.service";
import {Observable} from "rxjs";
import {IGroup, } from "../../../modules/info-lk/info.interfases";
import {IInstitution} from "../../../modules/auth/interfaces/auth/auth-responce-user.interface";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  constructor(private infoService: InfoService) { }
  nickName?: string;
  organization?: IInstitution;
  groups$?: Observable<IGroup[]>;
  currentGroup?: number;
  id: number = 0;
  nameTeacher$?: Observable<string>;

  ngOnInit() {
    this.groups$ = this.infoService.getGroups(true);
    let user = this.infoService.getInfoStudent(true);
    this.nickName = user.nickName;
    this.organization = user.institution.name;
    let id = sessionStorage.getItem("id-student-group");
    if(id) {
      this.id = JSON.parse(id);
    }
  }

  onFindGroup() {
    sessionStorage.setItem("id-student-group", JSON.stringify(this.id));
    if (this.id) {
      this.nameTeacher$ = this.infoService.getGroupInfo(this.id, true);
    }
  }
}
