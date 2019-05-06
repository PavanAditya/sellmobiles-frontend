import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileComponent } from './mobile.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { MobileService } from './mobile.service';
import { AuthGuard } from '../core/guards/auth.guard';

describe('MobileComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileComponent],
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule, RouterModule],
      providers: [MobileService, AuthGuard]
    });
  });

  it('Mobile Component should be created', () => {
    const fixture = TestBed.createComponent(MobileComponent);
    const mobileListComp = fixture.debugElement.componentInstance;
    expect(mobileListComp).toBeTruthy();
  });
});
