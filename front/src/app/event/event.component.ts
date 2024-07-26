import { Component, OnInit, NgZone } from '@angular/core';
import { EventService } from '../service/eventService';
import { BannerService } from '../service/bannerService';
import { Router } from '@angular/router';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent implements OnInit {
  displayBanner: boolean = true;
  events: Event[] = [];

  constructor(
    private bannerService: BannerService,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bannerService.setDisplayBanner(true);
    this.bannerService.displayBanner$.subscribe((displayBanner) => {
      console.log('Banner should be displayed:', displayBanner);
    });
    this.loadEvents();
  }
  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events: Event[]) => {
        this.events = events.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        console.log('Sorted events:', this.events);
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
  getImageUrl(photo: any): string {
    if (photo && photo.url) {
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

  viewEventDetail(id: string): void {
    this.router.navigate(['/events', id]);
  }
}
