import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = 'https://6135c78e60d2900017c3c156.mockapi.io/api/';
  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'users');
  }

  public deleteUser(id: string): Observable<any> {
    const url = `${this.baseUrl}users/${id}`;
    return this.http.delete(url);
  }

  public postUser(body: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseUrl + 'users', body).pipe(
      catchError(this.handleError<UserModel>('postUser'))
    );;
  }

  public putUser(id: string, body: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.baseUrl}users/${id}`, body).pipe(
      catchError(this.handleError<UserModel>('putUser'))
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
