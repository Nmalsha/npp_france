import { Component } from '@angular/core';
import { ContactService } from '../service/contactService';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  displayBanner(): boolean {
    return false;
  }

  constructor(private contactService: ContactService, private router: Router) {}

  submitForm(contactForm: NgForm) {
    if (contactForm.valid) {
      this.contactService.sendContactForm(contactForm.value).subscribe(
        (response) => {
          console.log('Form submitted successfully!', response);
          alert(
            'Your message was successfully sent , we will give you a feed backas soon as possible!'
          );
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error submitting form', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
