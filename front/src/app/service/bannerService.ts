import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private displayBannerSubject = new BehaviorSubject<boolean>(false);
  displayBanner$ = this.displayBannerSubject.asObservable();

  constructor() {}

  setDisplayBanner(status: boolean) {
    this.displayBannerSubject.next(status);
  }
}
