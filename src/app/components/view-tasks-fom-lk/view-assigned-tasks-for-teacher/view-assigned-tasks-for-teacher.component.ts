import {Component, Input, SimpleChanges} from '@angular/core';
import {InfoService} from "../../../modules/info-lk/info.service";
import {Observable} from "rxjs";
import {IAppTask} from "../../../modules/info-lk/info.interfases";

@Component({
  selector: 'app-view-assigned-tasks-for-teacher',
  templateUrl: './view-assigned-tasks-for-teacher.component.html',
  styleUrls: ['./view-assigned-tasks-for-teacher.component.scss']
})
export class ViewAssignedTasksForTeacherComponent {
  constructor(private infoService: InfoService) { }
  @Input() id!: number;
  appTasks$?: Observable<IAppTask[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && changes['id'].currentValue !== undefined) {
      this.appTasks$ = this.infoService.getAppTasks(changes['id'].currentValue, true);
    } else {
      console.log('Значение id не было передано в компоненту');
    }
  }
}
