import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events: Event[] = [];
  private apiUrl = 'http://localhost:8082/api/events/all';
  private apiUrl1 = 'http://localhost:8082/api/events';

  constructor(private http: HttpClient) {}

  // getAllEvents(): Event[] {
  //   return this.events;
  // }
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }
  addEvent(event: Event): void {
    this.events.push(event);
  }
  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl1}/${id}`);
  }
}
