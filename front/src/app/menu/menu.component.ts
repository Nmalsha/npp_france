import { Component, OnInit } from '@angular/core';
import { BannerService } from '../service/bannerService';
import { catchError, of } from 'rxjs';
import { TokenService } from '../service/token.Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  isMenuOpen = false;
  displayBanner = false;
  isAdmin: boolean = false;
  nickname: string | null = '';
  isLoggedIn = false;
  roles: string[] = [];

  constructor(
    private bannerService: BannerService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bannerService.displayBanner$.subscribe((status) => {
      this.displayBanner = status;
    });

    this.checkLoginStatus();
    this.nickname = this.tokenService.getNickname();
    this.roles = this.tokenService.getRoles();
    console.log('Nickname:', this.nickname);
    console.log('Roles:', this.roles);

    this.isAdmin = this.roles.includes('ROLE_ADMIN');
  }
  checkLoginStatus(): void {
    const token = this.tokenService.getToken();
    this.isLoggedIn = !!token;
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleIsRandomTrue(): void {
    // this.travelService.isRandom = true;
    // console.log('Random = True');
  }
  onLogout(): void {
    this.tokenService.logout();
    this.checkLoginStatus();
    this.nickname = this.tokenService.getNickname();
    this.router.navigate(['/home']);
  }

  toggleIsRandomFalse(): void {
    // this.travelService.isRandom = false;
    // console.log('Random = false');
  }
}
