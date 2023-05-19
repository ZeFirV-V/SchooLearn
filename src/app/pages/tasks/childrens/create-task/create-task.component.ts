import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {ISubject} from "../../../../modules/info-lk/info.interfases";
import {InfoLkFromTeacherService} from "../../../../modules/info-lk/info-lk-from-teacher.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  constructor(private infoLkFromTeacherService: InfoLkFromTeacherService, private route: ActivatedRoute, private router: Router) { }
  newSubject?: boolean;
  phase: number = 1;

  subjects$?: Observable<ISubject[]>
  ngOnInit() {
    this.subjects$ = this.infoLkFromTeacherService.getSubjects(true);
    this.route.queryParams.subscribe(params => {
      this.newSubject = params['newSubject'];
      if (this.newSubject) {
        this.subjects$ = this.infoLkFromTeacherService.getSubjects(true);
      }
    });
  }

  editSubject(subject: ISubject) {

  }

  onClick() {

  }
  backPhase(){
    if(this.phase === 1){
      this.router.navigate(["lk-teacher"]);
    } else {
      this.phase--;
    }
  }

  nextPhase() {
    this.phase++;
  }
}
