import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/eventService';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event_details.component.html',
  styleUrls: ['./event_details.component.css'],
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.loadEvent(eventId);
    }
  }

  loadEvent(id: string): void {
    this.eventService.getEventById(id).subscribe(
      (event: Event) => {
        this.event = event;
        console.log('event', event);
      },
      (error) => {
        console.error('Error fetching event:', error);
      }
    );
  }

  getImageUrl(photo: any): string {
    if (photo && photo.url) {
      console.log('photos', photo);
      return `http://localhost:8082/images/${photo.url}`;
    }
    return '';
  }

  getVideoUrl(video: any): string {
    if (video && video.url) {
      return `http://localhost:8082/videos/${video.url}`;
    }
    return '';
  }
}
