import { Component, OnInit } from '@angular/core';
import { BannerService } from '../service/bannerService';
import { catchError, of } from 'rxjs';
import { EventService } from '../service/eventService';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  displayBanner: boolean = true;
  events: Event[] = [];

  constructor(private bannerService: BannerService) {}

  ngOnInit(): void {
    this.bannerService.setDisplayBanner(true);
    this.bannerService.displayBanner$.subscribe((displayBanner) => {
      console.log('Banner should be displayed:', displayBanner);
    });
  }
}
