import { TestBed } from '@angular/core/testing';
import { AuthenticationComponent } from './authentication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { SocketService } from '../../services/socket.service';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../../guards/auth.guard';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { environment } from '../../../../environments/environment';

describe('AuthenticationComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationComponent],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        RecaptchaModule.forRoot(),
        RecaptchaFormsModule
      ],
      providers: [UserService, SnackbarService, SocketService, AuthService, AuthGuard,
        {
          provide: RECAPTCHA_SETTINGS,
          useValue: {
            siteKey: environment.siteKey,
          } as RecaptchaSettings,
        }]
    });

  });

  it('Authentication should be created', () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const authenticationComponent = fixture.debugElement.componentInstance;
    expect(authenticationComponent).toBeTruthy();

  });

  it(`Sign up form should be invalid`, () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const authenticationComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    authenticationComponent.signUpForm.controls[`firstName`].setValue('abc');
    authenticationComponent.signUpForm.controls[`lastName`].setValue('abc');
    authenticationComponent.signUpForm.controls[`email`].setValue('abc@abc.com');
    authenticationComponent.signUpForm.controls[`mobileNumber`].setValue('1234567890');
    authenticationComponent.signUpForm.controls[`location`].setValue('abc');
    authenticationComponent.signUpForm.controls[`password`].setValue('abc@1234');
    authenticationComponent.signUpForm.controls[`confirmPassword`].setValue('abc@1234');
    authenticationComponent.signUpForm.controls[`captchaForSignUp`].setValue('');
    expect(authenticationComponent.signUpForm.valid).toBeFalsy();
  });
  it(`Sign up form should be invalid`, () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const authenticationComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    authenticationComponent.signUpForm.controls[`firstName`].setValue('');
    authenticationComponent.signUpForm.controls[`lastName`].setValue('abc');
    authenticationComponent.signUpForm.controls[`email`].setValue('abc@abc.com');
    authenticationComponent.signUpForm.controls[`mobileNumber`].setValue('1234567890');
    authenticationComponent.signUpForm.controls[`location`].setValue('abc');
    authenticationComponent.signUpForm.controls[`password`].setValue('abc@1234');
    authenticationComponent.signUpForm.controls[`confirmPassword`].setValue('abc@1234');
    authenticationComponent.signUpForm.controls[`captchaForSignUp`].setValue('');
    expect(authenticationComponent.signUpForm.valid).toBeFalsy();
  });
  it(`Sign up form should be invalid`, () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const authenticationComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    authenticationComponent.signUpForm.controls[`firstName`].setValue('abc');
    authenticationComponent.signUpForm.controls[`lastName`].setValue('abc');
    authenticationComponent.signUpForm.controls[`email`].setValue('abcabc.com');
    authenticationComponent.signUpForm.controls[`mobileNumber`].setValue('1234567890');
    authenticationComponent.signUpForm.controls[`location`].setValue('abc');
    authenticationComponent.signUpForm.controls[`password`].setValue('abc@1234');
    authenticationComponent.signUpForm.controls[`confirmPassword`].setValue('abc@1234');
    authenticationComponent.signUpForm.controls[`captchaForSignUp`].setValue('');
    expect(authenticationComponent.signUpForm.valid).toBeFalsy();
  });
  it(`Sign up form should be invalid`, () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const authenticationComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    authenticationComponent.signUpForm.controls[`firstName`].setValue('abc');
    authenticationComponent.signUpForm.controls[`lastName`].setValue('abc');
    authenticationComponent.signUpForm.controls[`email`].setValue('abc@abccom');
    authenticationComponent.signUpForm.controls[`mobileNumber`].setValue('12345670');
    authenticationComponent.signUpForm.controls[`location`].setValue('abc');
    authenticationComponent.signUpForm.controls[`password`].setValue('abc@1234');
    authenticationComponent.signUpForm.controls[`confirmPassword`].setValue('abc@1234');
    authenticationComponent.signUpForm.controls[`captchaForSignUp`].setValue('');
    expect(authenticationComponent.signUpForm.valid).toBeFalsy();
  });

  it('should have a instance of userService ', () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const userServiceComp = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userServiceComp).toBeTruthy();
  });

  it('should have a instance of SnackbarService ', () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const snackbarServiceComp = fixture.debugElement.injector.get(SnackbarService);
    fixture.detectChanges();
    expect(snackbarServiceComp).toBeTruthy();
  });

  it('should have a instance of SocketService ', () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const socketServiceComp = fixture.debugElement.injector.get(SocketService);
    fixture.detectChanges();
    expect(socketServiceComp).toBeTruthy();
  });
});
