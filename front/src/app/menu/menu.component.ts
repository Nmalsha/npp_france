import { Component, OnInit } from '@angular/core';
import { BannerService } from '../service/bannerService';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  isMenuOpen = false;
  displayBanner = false;
  isAdmin: boolean = false;

  constructor(
    private bannerService: BannerService // private authService: AuthService
  ) {}

  ngOnInit() {
    this.bannerService.displayBanner$.subscribe((status) => {
      this.displayBanner = status;
    });
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleIsRandomTrue(): void {
    // this.travelService.isRandom = true;
    // console.log('Random = True');
  }

  toggleIsRandomFalse(): void {
    // this.travelService.isRandom = false;
    // console.log('Random = false');
  }
}
