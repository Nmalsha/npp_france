import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyWeHaveSiteComponent } from './why-we-have-site.component';

describe('WhyWeHaveSiteComponent', () => {
  let component: WhyWeHaveSiteComponent;
  let fixture: ComponentFixture<WhyWeHaveSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhyWeHaveSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhyWeHaveSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
