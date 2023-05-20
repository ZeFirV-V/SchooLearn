import {Component, ElementRef, EventEmitter, Input, Output, Renderer2} from '@angular/core';
import {InfoLkFromTeacherService} from "../../modules/info-lk/info-lk-from-teacher.service";
import {Observable} from "rxjs";
import { ISubject} from "../../modules/info-lk/info.interfases";
import * as events from "events";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  constructor(private infoLkFromTeacherService: InfoLkFromTeacherService) { }
  subjects$?: Observable<ISubject[]>;
  selectedSubjectId: number = 0;
  @Input() nickname: string = "";
  @Input() role: string = "";
  @Output() subjectId = new EventEmitter<number>();
  ngOnInit() {
    if(this.role === 'teacher') {
      this.subjects$ = this.infoLkFromTeacherService.getSubjects(true);
    }
    let id = sessionStorage.getItem("id-student-subject");
    if(id) {
      this.selectedSubjectId = JSON.parse(id);
    }
  }
  emitSubject(subjectId: number) {
    this.selectedSubjectId = subjectId;
    sessionStorage.setItem("id-student-subject", JSON.stringify(this.selectedSubjectId));
    this.subjectId.emit(subjectId);
  }
}
