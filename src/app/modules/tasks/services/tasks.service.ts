import { Injectable } from '@angular/core';
import {catchError, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {ITask} from "../interfaces/task.itnerface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "../../message/services/message.service";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private tasksUrl = '';  // URL to web api

  /** GET Tasks from the server */
  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.tasksUrl)
      .pipe(
        tap(_ => this.log('fetched tasks')),
        catchError(this.handleError<ITask[]>('getTasks', []))
      );
  }

  /** GET Task by subject. Will 404 if id not found */
  getTask(subject: string): Observable<ITask> {
    const url = `${this.tasksUrl}/${subject}`;
    return this.http.get<ITask>(url).pipe(
      tap(_ => this.log(`fetched task id=${subject}`)),
      catchError(this.handleError<ITask>(`getTask id=${subject}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`TaskService: ${message}`);
  }
}
