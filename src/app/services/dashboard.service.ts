import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TaskModel } from '../models/task.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl: string = 'https://6135c78e60d2900017c3c156.mockapi.io/api/';
  constructor(private http: HttpClient) { }

  public getJsonDataFile(path: string): Observable<any> {
    return this.http.get(path);
  }

  public getAllTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.baseUrl + 'task-list').pipe(
      catchError(this.handleError<TaskModel[]>('getAllTasks', []))
    );;
  }

  public getTaskById(id: string): Observable<TaskModel> {
    const url = `${this.baseUrl}task-list/${id}`;
    return this.http.get<TaskModel>(url).pipe(
      catchError(this.handleError<TaskModel>('getTaskById'))
    );;
  }

  public postTask(body: TaskModel): Observable<TaskModel[]> {
    return this.http.post<TaskModel[]>(this.baseUrl + 'task-list', body).pipe(
      catchError(this.handleError<TaskModel[]>('postTask', []))
    );;
  }

  public putTask(id: string, body: TaskModel): Observable<TaskModel[]> {
    return this.http.put<TaskModel[]>(`${this.baseUrl}task-list/${id}`, body).pipe(
      catchError(this.handleError<TaskModel[]>('putTask', []))
    );;
  }

  public deleteTask(id: string): Observable<any> {
    const url = `${this.baseUrl}task-list/${id}`;
    return this.http.delete(url);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
