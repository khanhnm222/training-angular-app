import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ScheduleModel } from '../models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  baseUrl: string = 'https://6135c78e60d2900017c3c156.mockapi.io/api/';
  constructor(private http: HttpClient) { }

  public getAllSchedules(): Observable<ScheduleModel[]> {
    return this.http.get<ScheduleModel[]>(this.baseUrl + 'schedules');
  }

  public deleteSchedule(id: string): Observable<any> {
    const url = this.baseUrl + `schedules/${id}`;
    return this.http.delete(url);
  }

  public postSchedule(body: ScheduleModel): Observable<ScheduleModel> {
    return this.http.post<ScheduleModel>(this.baseUrl + 'schedules', body).pipe(
      catchError(this.handleError<ScheduleModel>('postSchedule'))
    );;
  }

  public putSchedule(id: string, body: ScheduleModel): Observable<ScheduleModel> {
    return this.http.put<ScheduleModel>(`${this.baseUrl}schedules/${id}`, body).pipe(
      catchError(this.handleError<ScheduleModel>('putSchedule'))
    );;
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
