import { Component, OnInit, NgZone } from '@angular/core';
import { EventService } from '../service/eventService';
import { BannerService } from '../service/bannerService';
import { Router } from '@angular/router';
import { Event } from '../models/event.model';
import { catchError, of } from 'rxjs';

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
    this.eventService
      .getAllEvents()
      .pipe(
        catchError((error) => {
          console.error('Error fetching events:', error);
          return of([]); // Handle error case by returning an empty array
        })
      )
      .subscribe(
        (events: Event[]) => {
          console.log('Raw events data:', events);

          const sortedEvents = events.slice().sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            // Debug logs for date comparison
            console.log(`Comparing ${dateA} and ${dateB}`);

            // Check for invalid dates
            // if (isNaN(dateA) || isNaN(dateB)) {
            //   console.warn('Invalid date encountered:', {
            //     a: a.date,
            //     b: b.date,
            //   });
            //   return 0; // Maintain original order if dates are invalid
            // }

            // Return sorting result
            return dateA - dateB;
          });
          this.events = sortedEvents;
          console.log('Sorted events:', this.events);
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    // this.eventService
    //   .getAllEvents()
    //   .pipe(
    //     catchError((error) => {
    //       console.error('Error fetching events:', error);
    //       return of([]); // Handle error case by returning an empty array
    //     })
    //   )
    //   .subscribe(
    //     (events: Event[]) => {
    //       console.log('Raw events data:', events);
    //       this.events = events.sort((a, b) => {
    //         const dateA = new Date(a.date).getTime();
    //         const dateB = new Date(b.date).getTime();
    //         console.log(`Comparing ${dateA} and ${dateB}`);

    //         if (isNaN(dateA) || isNaN(dateB)) {
    //           console.warn('Invalid date encountered:', {
    //             a: a.date,
    //             b: b.date,
    //           });
    //           return 0; // Or some other logic to handle invalid dates
    //         }

    //         return dateA - dateB;
    //       });
    //       console.log('Sorted events:', this.events);
    //     },
    //     (error) => {
    //       console.error('Error fetching events:', error);
    //     }
    //   );
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
