import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { BannerService } from './service/bannerService';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReadmoreComponent } from './readmore/readmore.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { BannerComponent } from './banner/banner.component';
import { AddEventComponent } from './admin/add-event/add-event.component';
import { EventDetailComponent } from './event_details/event_details.component';
import { EventComponent } from './event/event.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ScrollingTextComponent } from './scrolling-text/scrolling-text.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { WhyWeHaveSiteComponent } from './why-we-have-site/why-we-have-site.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './admin/register/register.component';
import { DatePipe } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { UserSpaceComponent } from './admin/user-space/user-space.component';
import { EventSpaceComponent } from './admin/event-space/event-space.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventComponent,
    MenuComponent,
    TopMenuComponent,
    AboutComponent,
    ContactComponent,
    ReadmoreComponent,
    PageNotFoundComponent,
    BannerComponent,
    EventDetailComponent,
    AddEventComponent,
    ScrollingTextComponent,
    ImageCarouselComponent,
    WhyUsComponent,
    WhyWeHaveSiteComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    UserSpaceComponent,
    EventSpaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    SlickCarouselModule,
  ],
  providers: [BannerService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
