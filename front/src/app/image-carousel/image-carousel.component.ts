import { Component, Input } from '@angular/core';
import { EventService } from '../service/eventService';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.css',
})
export class ImageCarouselComponent {
  carouselImages: string[] = [];
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events: Event[]) => {
        console.log('Events received in ImageCarouselComponent:', events);
        this.carouselImages = this.getCarouselImages(events);
        console.log('Carousel images:', this.carouselImages);
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  getCarouselImages(events: Event[]): string[] {
    const images: string[] = [];

    events.forEach((event) => {
      if (event.photos && event.photos.length > 0) {
        event.photos.forEach((photo) => {
          // Assuming each `photo` is a string URL
          images.push(`http://localhost:8082/images/${photo.url}`);
          // if (typeof photo === 'string') {
          //   images.push(`http://localhost:8082/images/${photo}`);
          // }
        });
      }
    });
    images.push('assets/img/npp1.jpg', 'assets/img/npp2.jpg');
    return images;
  }
}
