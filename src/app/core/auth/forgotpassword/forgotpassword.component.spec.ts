import { TestBed } from '@angular/core/testing';
import { ForgotpasswordComponent } from './forgotpassword.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SnackbarService } from '../../services/snackbar.service';
import { AuthService } from '../auth.service';


describe('ForgotpasswordComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotpasswordComponent],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ]

    });

  });
  it('Forgot Password should be created', () => {
    const fixture = TestBed.createComponent(ForgotpasswordComponent);
    const forgotpasswordComponent = fixture.debugElement.componentInstance;
    expect(forgotpasswordComponent).toBeTruthy();

  });

  it(`form should be valid`, () => {
    const fixture = TestBed.createComponent(ForgotpasswordComponent);
    const forgotpasswordComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    forgotpasswordComponent.forgotPasswordForm.controls[`email`].setValue('abc@abc.com');
    expect(forgotpasswordComponent.forgotPasswordForm.valid).toBeTruthy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ForgotpasswordComponent);
    const forgotpasswordComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    forgotpasswordComponent.forgotPasswordForm.controls[`email`].setValue('abcabc.com');
    expect(forgotpasswordComponent.forgotPasswordForm.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ForgotpasswordComponent);
    const forgotpasswordComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    forgotpasswordComponent.forgotPasswordForm.controls[`email`].setValue('abc@abccom');
    expect(forgotpasswordComponent.forgotPasswordForm.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ForgotpasswordComponent);
    const forgotpasswordComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    forgotpasswordComponent.forgotPasswordForm.controls[`email`].setValue();
    expect(forgotpasswordComponent.forgotPasswordForm.valid).toBeFalsy();
  });
  it('should have a instance of snackbarService ', () => {
    const fixture = TestBed.createComponent(ForgotpasswordComponent);
    const snackbarServiceComp = fixture.debugElement.injector.get(SnackbarService);
    fixture.detectChanges();
    expect(snackbarServiceComp).toBeTruthy();
  });
  it('should have a instance of authService ', () => {
    const fixture = TestBed.createComponent(ForgotpasswordComponent);
    const authServiceComp = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
    expect(authServiceComp).toBeTruthy();
  });
});
