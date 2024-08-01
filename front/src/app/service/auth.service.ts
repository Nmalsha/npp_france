import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  register(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getAuthToken()}`,
    });
  }
  getAllUsers(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/user/all`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    // Log error to console or display it to the user
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
