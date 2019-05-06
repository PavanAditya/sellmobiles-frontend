import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDeleteConfirmationComponent } from './profile-delete-confirmation.component';

describe('ProfileDeleteConfirmationComponent', () => {
  let component: ProfileDeleteConfirmationComponent;
  let fixture: ComponentFixture<ProfileDeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
