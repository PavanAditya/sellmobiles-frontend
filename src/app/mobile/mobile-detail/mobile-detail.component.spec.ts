import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { MobileDetailComponent } from './mobile-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { MobileService } from '../mobile.service';
import { AuthGuard } from '../../core/guards/auth.guard';
import { UserService } from '../../core/services/user.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { DataShareService } from '../../core/services/data-share.service';
import { AuthService } from '../../core/auth/auth.service';

describe('MobileDetailComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileDetailComponent],
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule, RouterModule],
      providers: [MobileService, UserService, SnackbarService, DataShareService, AuthService, AuthGuard]
    });
  });

  it('Mobile Detail Component should be created', () => {
    const fixture = TestBed.createComponent(MobileDetailComponent);
    const userCompo = fixture.debugElement.componentInstance;
    expect(userCompo).toBeTruthy();
  });
  it('should have a instance of mobileService ', () => {
    const fixture = TestBed.createComponent(MobileDetailComponent);
    const mobileServiceComp = fixture.debugElement.injector.get(MobileService);
    fixture.detectChanges();
    expect(mobileServiceComp).toBeTruthy();
  });

  it('should have a instance of userService ', () => {
    const fixture = TestBed.createComponent(MobileDetailComponent);
    const userServiceComp = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userServiceComp).toBeTruthy();
  });
  it('should have a instance of dataShareService ', () => {
    const fixture = TestBed.createComponent(MobileDetailComponent);
    const dataShareComp = fixture.debugElement.injector.get(DataShareService);
    fixture.detectChanges();
    expect(dataShareComp).toBeTruthy();
  });
  it('should have a instance of snackbarService ', () => {
    const fixture = TestBed.createComponent(MobileDetailComponent);
    const snackbarServiceComp = fixture.debugElement.injector.get(SnackbarService);
    fixture.detectChanges();
    expect(snackbarServiceComp).toBeTruthy();
  });
  it('should have a instance of authService ', () => {
    const fixture = TestBed.createComponent(MobileDetailComponent);
    const authServiceComp = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
    expect(authServiceComp).toBeTruthy();
  });
});
