import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:8082/api/send-email';
  constructor(private http: HttpClient) {}

  sendContactForm(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
