import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReadmoreComponent } from './readmore/readmore.component';
import { ContactComponent } from './contact/contact.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EventDetailComponent } from './event_details/event_details.component';
import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'event', component: EventComponent, title: 'Event' },
  { path: 'events/:id', component: EventDetailComponent },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'contact', component: ContactComponent, title: 'Contact' },

  {
    path: 'readmore',
    component: ReadmoreComponent,
    title: 'Readmore',
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   title: 'login',
  // },
  {
    path: 'addevent',
    component: AddEventComponent,
    title: 'addevent',
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
