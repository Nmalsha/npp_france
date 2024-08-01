import { Component, OnInit } from '@angular/core';
import { EventService } from '../../service/eventService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-space',
  templateUrl: './event-space.component.html',
  styleUrl: './event-space.component.css',
})
export class EventSpaceComponent implements OnInit {
  events: any[] = [];
  showAddEventForm = false;

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe((events) => {
      const sortedEvents = events.slice().sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      this.events = sortedEvents;
    });
  }

  navigateToAddEvent(): void {
    this.router.navigate(['/admin/add-event']);
  }

  deleteEvent(eventId: number): void {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.loadEvents();
    });
  }
}
