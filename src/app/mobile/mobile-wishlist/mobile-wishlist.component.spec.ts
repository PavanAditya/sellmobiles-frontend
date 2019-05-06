import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileWishlistComponent } from './mobile-wishlist.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { MobileService } from '../mobile.service';
import { AuthGuard } from '../../core/guards/auth.guard';
import { UserService } from '../../core/services/user.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { AuthService } from '../../core/auth/auth.service';

describe('MobileWishlistComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileWishlistComponent],
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule, RouterModule],
      providers: [MobileService, UserService, SnackbarService, AuthService, AuthGuard]
    });
  });

  it('Mobile List Component should be created', () => {
    const fixture = TestBed.createComponent(MobileWishlistComponent);
    const mobileListComp = fixture.debugElement.componentInstance;
    expect(mobileListComp).toBeTruthy();
  });
  it('should have a instance of userService ', () => {
    const fixture = TestBed.createComponent(MobileWishlistComponent);
    const userServiceComp = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userServiceComp).toBeTruthy();
  });
  it('should have a instance of snackbarService ', () => {
    const fixture = TestBed.createComponent(MobileWishlistComponent);
    const snackbarServiceComp = fixture.debugElement.injector.get(SnackbarService);
    fixture.detectChanges();
    expect(snackbarServiceComp).toBeTruthy();
  });
  it('should have a instance of authService ', () => {
    const fixture = TestBed.createComponent(MobileWishlistComponent);
    const authServiceComp = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
    expect(authServiceComp).toBeTruthy();
  });
  it('should have a instance of mobileService ', () => {
    const fixture = TestBed.createComponent(MobileWishlistComponent);
    const mobileServiceComp = fixture.debugElement.injector.get(MobileService);
    fixture.detectChanges();
    expect(mobileServiceComp).toBeTruthy();
  });
  it('should render text h3 tag', async(() => {
    const fixture = TestBed.createComponent(MobileWishlistComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('My Wishlist');
  }));
});
