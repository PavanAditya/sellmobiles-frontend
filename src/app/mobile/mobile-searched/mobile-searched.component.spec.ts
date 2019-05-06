import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSearchedComponent } from './mobile-searched.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { MobileService } from '../mobile.service';
import { UserService } from '../../core/services/user.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { DataShareService } from '../../core/services/data-share.service';
import { AuthService } from '../../core/auth/auth.service';
import { SearchService } from '../../core/services/search.service';
import { FilterService } from '../../core/services/filter.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MobileSearchedComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileSearchedComponent],
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule, RouterModule, BrowserAnimationsModule],
      providers: [MobileService, UserService, SnackbarService, DataShareService, AuthService, SearchService, FilterService, AuthGuard]
    });
  });

  it('Mobile List Component should be created', () => {
    const fixture = TestBed.createComponent(MobileSearchedComponent);
    const mobileListComp = fixture.debugElement.componentInstance;
    expect(mobileListComp).toBeTruthy();
  });
  it('should have a instance of userService ', () => {
    const fixture = TestBed.createComponent(MobileSearchedComponent);
    const userServiceComp = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userServiceComp).toBeTruthy();
  });
  it('should have a instance of snackbarService ', () => {
    const fixture = TestBed.createComponent(MobileSearchedComponent);
    const snackbarServiceComp = fixture.debugElement.injector.get(SnackbarService);
    fixture.detectChanges();
    expect(snackbarServiceComp).toBeTruthy();
  });
  it('should have a instance of authService ', () => {
    const fixture = TestBed.createComponent(MobileSearchedComponent);
    const authServiceComp = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
    expect(authServiceComp).toBeTruthy();
  });
  it('should have a instance of searchService ', () => {
    const fixture = TestBed.createComponent(MobileSearchedComponent);
    const authServiceComp = fixture.debugElement.injector.get(SearchService);
    fixture.detectChanges();
    expect(authServiceComp).toBeTruthy();
  });
  it('should have a instance of filterService ', () => {
    const fixture = TestBed.createComponent(MobileSearchedComponent);
    const authServiceComp = fixture.debugElement.injector.get(FilterService);
    fixture.detectChanges();
    expect(authServiceComp).toBeTruthy();
  });
});
