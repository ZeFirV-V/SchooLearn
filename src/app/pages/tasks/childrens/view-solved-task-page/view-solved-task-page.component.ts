import { Component } from '@angular/core';
import {Observable, of, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {InfoService} from "../../../../modules/info-lk/info.service";
import {ISolvedTaskFullInfo} from "../../../../modules/info-lk/info.interfases";
import { Location } from '@angular/common';
@Component({
  selector: 'app-view-solved-task-page',
  templateUrl: './view-solved-task-page.component.html',
  styleUrls: ['./view-solved-task-page.component.scss']
})
export class ViewSolvedTaskPageComponent {
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
