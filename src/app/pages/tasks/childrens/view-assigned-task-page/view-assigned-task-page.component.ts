import { Component } from '@angular/core';
import {Observable, of, switchMap} from "rxjs";
import {ISolvedTaskFullInfo} from "../../../../modules/info-lk/info.interfases";
import {InfoService} from "../../../../modules/info-lk/info.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-view-assigned-task-page',
  templateUrl: './view-assigned-task-page.component.html',
  styleUrls: ['./view-assigned-task-page.component.scss']
})
export class ViewAssignedTaskPageComponent {
  task$!: Observable<ISolvedTaskFullInfo>;

  constructor(private infoService: InfoService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.task$ = this.route.paramMap.pipe(
      switchMap(params => {
        let id: string | null =  params.get('taskId')
        if(id !== null)
          return this.infoService.getSolvedTaskFullInfo(parseInt(id), true);
        else {
          return of()
        }
      })
    );
  }

  backPhase() {
    this.location.back();
  }
}
