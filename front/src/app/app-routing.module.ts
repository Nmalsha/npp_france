import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReadmoreComponent } from './readmore/readmore.component';
import { ContactComponent } from './contact/contact.component';
import { AddEventComponent } from './admin/add-event/add-event.component';
import { EventDetailComponent } from './event_details/event_details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { UserSpaceComponent } from './admin/user-space/user-space.component';
import { EventSpaceComponent } from './admin/event-space/event-space.component';
import { AuthGuard } from './service/auth.guard';
import { AdminGuard } from './service/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'event', component: EventComponent, title: 'Event' },
  { path: 'events/:id', component: EventDetailComponent },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'contact', component: ContactComponent, title: 'Contact' },
  {
    path: 'admin/userspace',
    component: UserSpaceComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/eventspace',
    component: EventSpaceComponent,
    canActivate: [AuthGuard, AdminGuard],
  },

  {
    path: 'readmore',
    component: ReadmoreComponent,
    title: 'Readmore',
  },
  {
    path: 'site_login__/login',
    component: LoginComponent,
    title: 'login',
  },
  {
    path: 'admin/signup',
    component: RegisterComponent,
    title: 'signup',
  },
  {
    path: 'admin/add-event',
    component: AddEventComponent,
    title: 'addevent',
    canActivate: [AuthGuard, AdminGuard],
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
