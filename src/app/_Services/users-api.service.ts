import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ResponseObject } from '../models/responseObj';
import { Users } from './users';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  apiURL = 'http://localhost:5293';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<ResponseObject> {
    return this.http
      .get<ResponseObject>(this.apiURL + '/api/Users')
      .pipe(retry(1), catchError(this.handleError));
  }

  getUserId(id: any): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(this.apiURL + '/api/Users/' + id);
  }

  findUserByEmail(email: string) {
    return this.http.get<ResponseObject>(
      this.apiURL + '/api/Users/userExists?email=' + email
    );
  }

  createUsers(userData: any) {
    return this.http.post<any>(this.apiURL + '/api/Users/signup', userData);
  }

  updateUserRole(userData: any) {
    return this.http.put(this.apiURL + '/api/Users/manageUsers', userData);
  }

  deleteUserId(id: any) {
    return this.http.delete<any>(this.apiURL + '/api/Users/' + id);
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
