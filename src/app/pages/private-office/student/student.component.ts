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
  id!: number;
  nameTeacher$?: Observable<string>;

  ngOnInit() {
    this.groups$ = this.infoService.getGroups(true);
    let user = this.infoService.getInfoStudent(true);
    this.nickName = user.nickName;
    this.organization = user.institution.name;
  }

  onFindGroup(event: any) {
    this.id = parseInt(event.target.value);
    if (this.id) {
      this.nameTeacher$ = this.infoService.getGroupInfo(this.id, true);
    }
  }
}
