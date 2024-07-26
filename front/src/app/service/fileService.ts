import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}

  convertUrlToFile(url: string, fileName: string): Promise<File | null> {
    return fetch(url)
      .then((response) => response.blob())
      .then((blob) => new File([blob], fileName));
  }
}
