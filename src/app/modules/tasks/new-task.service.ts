// https://localhost:7079/task/any?subjectId=1&difficultyId=2
// public long Id { get; set; }
//
// public string Name { get; set; }
//
// public string Description { get; set; }
//
// public SubjectApiModel Subject { get; set; }
//
// public Difficulty Difficulty { get; set; }
//
// public TeacherApiModel Teacher { get; set; }
//
// public InstitutionApiModel Institution { get; set; }
//
// public string? Answer { get; set; }
//
// public bool IsPublic { get; set; }
//
// public bool IsExtendedTask { get; set; }
//
// public DateTime CreationDateTime { get; set; }
//
// public DateTime Deadline { get; set; }
import { Injectable } from '@angular/core';
import { Observable, of} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { IAppTakFullInfo } from "../info-lk/info.interfases";

@Injectable({
  providedIn: 'root'
})
export class NewTaskService {
  constructor(private http: HttpClient, private _router: Router) { }

  getFreeTask(subjectId: number): Observable<IAppTakFullInfo> {
    let a = true;
    if (a) {
      const tasksInfo: IAppTakFullInfo = {
        id: 1,
        name: "name-1",
        description: "description",
        subject: "subject",
        difficulty: "сложный",
        teacher: "teacher",
        institution: "institution",
        isPublic: false,
        isExtendedTask: false,
        creationDateTime: new Date(),
        deadline: new Date(),
      }
      return of(tasksInfo);
    }
    return this.http.get<IAppTakFullInfo>(`https://localhost:7079/task/any?subjectId=${subjectId}`);
  }

  checkAnswer(taskId: number, answer: string): Observable<boolean> {
    let a = true;
    if (a) {
      return of(true);
    }
    return this.http.put<boolean>(`https://localhost:7079/task/check`, {
      taskId: taskId,
      answer: answer,
    });
  }
}
