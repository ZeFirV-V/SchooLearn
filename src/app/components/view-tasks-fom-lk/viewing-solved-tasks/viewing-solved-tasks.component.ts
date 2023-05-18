import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {InfoService} from "../../../modules/info-lk/info.service";
import {Observable} from "rxjs";
import { ISolvedTask} from "../../../modules/info-lk/info.interfases";

@Component({
  selector: 'app-viewing-solved-tasks',
  templateUrl: './viewing-solved-tasks.component.html',
  styleUrls: ['./viewing-solved-tasks.component.scss']
})
export class ViewingSolvedTasksComponent implements OnChanges{
  constructor(private infoService: InfoService) { }
  @Input() id!: number;
  solvedTasks$?: Observable<ISolvedTask[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && changes['id'].currentValue !== undefined) {
      this.solvedTasks$ = this.infoService.getSolvedTasksInfo( parseInt(changes['id'].currentValue), true);
    } else {
      console.log('Значение id не было передано в компоненту');
    }
  }
}
