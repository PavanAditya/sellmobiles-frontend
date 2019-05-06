import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInMobileComponent } from './details-in-mobile.component';

describe('DetailsInMobileComponent', () => {
  let component: DetailsInMobileComponent;
  let fixture: ComponentFixture<DetailsInMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsInMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsInMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
