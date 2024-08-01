import { Component } from '@angular/core';
import { EventService } from '../../service/eventService';
import { Event } from '../../models/event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileService } from '../../service/fileService';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css',
})
export class AddEventComponent {
  title: string = '';
  description: string = '';
  date: string;
  photoUrls: File[] = [];
  videoUrls: File[] = [];
  photoPreviews: string[] = [];
  photoInputs: number[] = [0];

  constructor(
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  apiUrl = 'http://localhost:8082/api/events/create';

  onSubmit(): void {
    const formattedDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('date', formattedDate || '');

    this.photoUrls.forEach((photo) => {
      formData.append('photos', photo, photo.name);
    });

    if (this.videoUrls) {
      this.videoUrls.forEach((video) => {
        formData.append('videos', video, video.name);
      });
    }

    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    this.http.post<any>(this.apiUrl, formData, httpOptions).subscribe(
      (response) => {
        console.log('Event created successfully:', response);
        this.resetForm();
        this.router.navigate(['/admin/eventspace']);
      },
      (error) => {
        console.error('Error creating event:', error);
      }
    );
  }

  resetForm(): void {
    this.title = '';
    this.description = '';
    this.date = '';
    this.photoUrls = [];
    this.videoUrls = [];
    this.photoPreviews = [];
  }

  onDateChange(event: any) {
    this.date = event.target.value;
    console.log('Selected date:', this.date);
  }

  onPhotoSelected(event: any, index: number): void {
    const files = event.target.files as FileList;

    if (files && files.length > 0) {
      this.photoUrls[index] = files[0];

      this.photoPreviews[index] = URL.createObjectURL(files[0]);
    }
  }
  addPhotoInput(): void {
    this.photoInputs.push(this.photoInputs.length);
  }

  onVideoSelected(event: any): void {
    const files = event.target.files as FileList;
    if (files) {
      this.videoUrls = Array.from(files);
    }
  }
}
