import { Component, OnInit} from '@angular/core';

import {Observable, of, switchMap} from "rxjs";

import {ActivatedRoute} from "@angular/router";
import {IAppTakFullInfo} from "../../../../modules/info-lk/info.interfases";
import {Location} from "@angular/common";
import {NewTaskService} from "../../../../modules/tasks/new-task.service";

@Component({
  selector: 'app-task.scss',
  templateUrl: './task.page.web.html',
  styleUrls: ['./task.page.web.scss']
})
export class TaskPageWeb implements OnInit {
  task$!: Observable<IAppTakFullInfo>;
  answer?: string;
  result$?: Observable<any>;
  constructor(private taskService: NewTaskService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.task$ = this.route.paramMap.pipe(
      switchMap(params => {
        let id: string | null =  params.get('subjectId')
        if(id !== null)
          return this.taskService.getFreeTask(parseInt(id));
        else {
          return of()
        }
      })
    );
  }

  endTask(task: IAppTakFullInfo) {
    if(this.answer)
      this.result$ = this.taskService.checkAnswer(task.id, this.answer)
  }

  calculateDifficulty(difficulty: string) {
    if(difficulty === "легкий")
      return 1;
    else if(difficulty === "средний") {
      return 2;
    }
    else if(difficulty === "сложный") {
      return 3;
    }
    return 0
  }

  backPhase() {
    this.location.back();
  }

  nextTask() {
    this.task$ = this.route.paramMap.pipe(
      switchMap(params => {
        let id: string | null =  params.get('subjectId')
        if(id !== null) {
          console.log("next");
          this.answer = undefined;
          this.result$ = undefined;
          return this.taskService.getFreeTask(parseInt(id));
        }
        else {
          return of()
        }
      })
    );
  }
}

