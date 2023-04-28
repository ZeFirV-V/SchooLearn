import {Component, OnInit} from '@angular/core';
import {SubjectService} from "../../../../modules/tasks/services/subject.service";
import {ISubject} from "../../../../modules/tasks/interfaces/subject.interface";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.web.html',
  styleUrls: ['./subjects.page.web.scss']
})
export class SubjectsPageWeb implements OnInit{
  subjects$: Observable<ISubject[]> = new Observable<ISubject[]>();

  constructor(private _subjectService: SubjectService) { }
  ngOnInit(): void {
    this.subjects$ = this._subjectService.getSubjects();
  }
}
