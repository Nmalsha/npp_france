import { Component, OnInit } from '@angular/core';
import { BannerService } from '../service/bannerService';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent implements OnInit {
  displayBanner = false;

  constructor(private bannerService: BannerService) {}

  ngOnInit() {
    this.bannerService.displayBanner$.subscribe((status) => {
      this.displayBanner = status;
    });
  }
}
