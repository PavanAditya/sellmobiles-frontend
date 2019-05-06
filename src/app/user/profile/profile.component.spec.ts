import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AuthGuard } from '../../core/guards/auth.guard';
import { SnackbarService } from '../../core/services/snackbar.service';

describe('ProfileComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule, RouterModule],
      providers: [UserService, AuthGuard]
    });
  });

  it('Mobile Component should be created', () => {
    const fixture = TestBed.createComponent(ProfileComponent);
    const mobileListComp = fixture.debugElement.componentInstance;
    expect(mobileListComp).toBeTruthy();
  });
  it('should have a instance of userService ', () => {
    const fixture = TestBed.createComponent(ProfileComponent);
    const userServiceComp = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userServiceComp).toBeTruthy();
  });
  it('should have a instance of snackbarService ', () => {
    const fixture = TestBed.createComponent(ProfileComponent);
    const snackbarServiceComp = fixture.debugElement.injector.get(SnackbarService);
    fixture.detectChanges();
    expect(snackbarServiceComp).toBeTruthy();
  });
  // it('should render text in a h3 tag', async(() => {
  //   const fixture = TestBed.createComponent(ProfileComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h3').textContent).toContain('MY PROFILE');
  // }));
  it('should render text in button tag', async(() => {
    const fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Edit Profile');
  }));
  // it('should render text in a h3 tag', async(() => {
  //   const fixture = TestBed.createComponent(ProfileComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h3').textContent).not.toContain('MYPROFILE');
  // }));
  it('should render text in button tag', async(() => {
    const fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).not.toContain('EditProfile');
  }));
});
