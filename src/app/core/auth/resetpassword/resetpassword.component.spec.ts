import { TestBed } from '@angular/core/testing';
import { ResetpasswordComponent } from './resetpassword.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SnackbarService } from '../../services/snackbar.service';
import { AuthService } from '../auth.service';


describe('ResetpasswordComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetpasswordComponent],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [ SnackbarService, AuthService]

    });

  });
  it('Reset Password should be created', () => {
    const fixture = TestBed.createComponent(ResetpasswordComponent);
    const resetpasswordComponent = fixture.debugElement.componentInstance;
    expect(resetpasswordComponent).toBeTruthy();

  });

  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ResetpasswordComponent);
    const resetpasswordComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    resetpasswordComponent.resetPasswordForm.controls[`password`].setValue('Abc@1234');
    resetpasswordComponent.resetPasswordForm.controls[`confirmPassword`].setValue();
    expect(resetpasswordComponent.resetPasswordForm.valid).toBeFalsy();
  });
  it(`form should be valid`, () => {
    const fixture = TestBed.createComponent(ResetpasswordComponent);
    const resetpasswordComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    resetpasswordComponent.resetPasswordForm.controls[`password`].setValue('Abc@1234');
    resetpasswordComponent.resetPasswordForm.controls[`confirmPassword`].setValue('Abc@1234');
    expect(resetpasswordComponent.resetPasswordForm.valid).toBeTruthy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ResetpasswordComponent);
    const resetpasswordComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    resetpasswordComponent.resetPasswordForm.controls[`password`].setValue();
    resetpasswordComponent.resetPasswordForm.controls[`confirmPassword`].setValue('Abc@1234');
    expect(resetpasswordComponent.resetPasswordForm.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ResetpasswordComponent);
    const resetpasswordComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    resetpasswordComponent.resetPasswordForm.controls[`password`].setValue('abc@1234');
    resetpasswordComponent.resetPasswordForm.controls[`confirmPassword`].setValue('abc@1234');
    expect(resetpasswordComponent.resetPasswordForm.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ResetpasswordComponent);
    const resetpasswordComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    resetpasswordComponent.resetPasswordForm.controls[`password`].setValue('Abc1234');
    resetpasswordComponent.resetPasswordForm.controls[`confirmPassword`].setValue('Abc1234');
    expect(resetpasswordComponent.resetPasswordForm.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ResetpasswordComponent);
    const resetpasswordComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    resetpasswordComponent.resetPasswordForm.controls[`password`].setValue('Abc1234');
    resetpasswordComponent.resetPasswordForm.controls[`confirmPassword`].setValue('');
    expect(resetpasswordComponent.resetPasswordForm.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ResetpasswordComponent);
    const resetpasswordComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    resetpasswordComponent.resetPasswordForm.controls[`password`].setValue('');
    resetpasswordComponent.resetPasswordForm.controls[`confirmPassword`].setValue('');
    expect(resetpasswordComponent.resetPasswordForm.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ResetpasswordComponent);
    const resetpasswordComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    resetpasswordComponent.resetPasswordForm.controls[`password`].setValue('Abc');
    resetpasswordComponent.resetPasswordForm.controls[`confirmPassword`].setValue('Abc');
    expect(resetpasswordComponent.resetPasswordForm.valid).toBeFalsy();
  });
  it('should have a instance of snackbarService ', () => {
    const fixture = TestBed.createComponent(ResetpasswordComponent);
    const snackbarServiceComp = fixture.debugElement.injector.get(SnackbarService);
    fixture.detectChanges();
    expect(snackbarServiceComp).toBeTruthy();
  });
  it('should have a instance of authService ', () => {
    const fixture = TestBed.createComponent(ResetpasswordComponent);
    const authServiceComp = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
    expect(authServiceComp).toBeTruthy();
  });
});
