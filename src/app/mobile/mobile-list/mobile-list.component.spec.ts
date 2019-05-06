import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileListComponent } from './mobile-list.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { MobileService } from '../mobile.service';
import { AuthGuard } from '../../core/guards/auth.guard';
import { UserService } from '../../core/services/user.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { DataShareService } from '../../core/services/data-share.service';
import { AuthService } from '../../core/auth/auth.service';

describe('MobileListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileListComponent],
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule, RouterModule],
      providers: [MobileService, UserService, SnackbarService, DataShareService, AuthService, AuthGuard]
    });
  });

  it('Mobile List Component should be created', () => {
    const fixture = TestBed.createComponent(MobileListComponent);
    const mobileListComp = fixture.debugElement.componentInstance;
    expect(mobileListComp).toBeTruthy();
  });
  it('should have a instance of userService ', () => {
    const fixture = TestBed.createComponent(MobileListComponent);
    const userServiceComp = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userServiceComp).toBeTruthy();
  });
  it('should have a instance of snackbarService ', () => {
    const fixture = TestBed.createComponent(MobileListComponent);
    const snackbarServiceComp = fixture.debugElement.injector.get(SnackbarService);
    fixture.detectChanges();
    expect(snackbarServiceComp).toBeTruthy();
  });
  it('should have a instance of authService ', () => {
    const fixture = TestBed.createComponent(MobileListComponent);
    const authServiceComp = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
    expect(authServiceComp).toBeTruthy();
  });
});
