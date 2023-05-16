import { Component } from '@angular/core';
import {InfoService} from "../../../modules/info-lk/info.service";
import {Observable} from "rxjs";
import {IAppTask, IGroup, ISolvedTask} from "../../../modules/info-lk/info.interfases";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  constructor(private infoService: InfoService) { }
  role?: string;
  nickName?: string;
  organization?: string;
  groups?: Observable<IGroup[]>;
  solvedTasks?: Observable<ISolvedTask[]>;
  appTasks?: Observable<IAppTask[]>;
  nameTeacher?: Observable<string>;

  ngOnInit() {
    this.groups = this.infoService.getGroups();
    let user = this.infoService.getInfoStudent();
    this.role = user.role;
    this.nickName = user.nickName;
    this.organization = user.institution;
  }

  clickOnGroup(id: number) {
    this.nameTeacher = this.infoService.getGroupInfo(id);
    this.solvedTasks = this.infoService.getSolvedTasksInfo(id);
    this.appTasks = this.infoService.getAppTasks(id);
  }
}
