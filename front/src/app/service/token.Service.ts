import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getToken(): string | null {
    // return localStorage.getItem('token');
    const token = localStorage.getItem('token');
    console.log('Retrieved token from local storage:', token);
    return token;
  }

  decodeToken(token: string): any {
    try {
      const decoded = jwt_decode(token);
      console.log('Decoded Token:', decoded);
      return decoded;
    } catch (Error) {
      console.error('Token decode error:', Error);
      return null;
    }
  }

  getNickname(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      const nickname = decoded ? decoded.nickname : null;
      console.log('Decoded token:', decoded);
      console.log('Retrieved nickname:', nickname);
      return nickname;
    }
    return null;
  }
  getRoles(): string[] {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      return decoded && decoded.roles ? decoded.roles : [];
    }
    return [];
  }

  logout(): void {
    localStorage.removeItem('token');
    console.log('User logged out');
  }
}
