import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  design_image: string = '/assets/img/maquette_image_gauche.PNG';
  logo_image: string = '/assets/img/maquette_logo.PNG';

  displayBanner(): boolean {
    return false;
  }
}
