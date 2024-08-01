import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from './token.Service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    const roles = this.tokenService.getRoles();
    if (roles.includes('ROLE_ADMIN')) {
      return true;
    } else {
      this.router.navigate(['/not-authorized']);
      return false;
    }
  }
}
