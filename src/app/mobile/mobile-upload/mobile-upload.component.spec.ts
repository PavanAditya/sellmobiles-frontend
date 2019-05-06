import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileUploadComponent } from './mobile-upload.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { MobileService } from '../mobile.service';
import { UserService } from '../../core/services/user.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { DataShareService } from '../../core/services/data-share.service';
import { AuthService } from '../../core/auth/auth.service';
import { AuthGuard } from '../../core/guards/auth.guard';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment.prod';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MobileUploadComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileUploadComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        RouterModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule],
      providers: [MobileService, UserService, SnackbarService, DataShareService, AuthService, AuthGuard, AngularFirestore]
    });
  });

  it('Mobile List Component should be created', () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const mobileListComp = fixture.debugElement.componentInstance;
    expect(mobileListComp).toBeTruthy();
  });
  it('should have a instance of userService ', () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const userServiceComp = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userServiceComp).toBeTruthy();
  });
  it('should have a instance of snackbarService ', () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const snackbarServiceComp = fixture.debugElement.injector.get(SnackbarService);
    fixture.detectChanges();
    expect(snackbarServiceComp).toBeTruthy();
  });
  it('should have a instance of authService ', () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const authServiceComp = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
    expect(authServiceComp).toBeTruthy();
  });
  it('should render text h3 tag', async(() => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Details');
  }));
  it('should render text button tag', async(() => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Reset');
  }));
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const uploadComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    uploadComponent.firstFormGroup.controls[`brand`].setValue();
    uploadComponent.firstFormGroup.controls[`model`].setValue();
    uploadComponent.firstFormGroup.controls[`location`].setValue();
    uploadComponent.firstFormGroup.controls[`price`].setValue('1');
    expect(uploadComponent.firstFormGroup.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const uploadComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    uploadComponent.firstFormGroup.controls[`brand`].setValue('Samsung');
    uploadComponent.firstFormGroup.controls[`model`].setValue('M10');
    uploadComponent.firstFormGroup.controls[`location`].setValue('Hyderabad');
    uploadComponent.firstFormGroup.controls[`price`].setValue('12000');
    expect(uploadComponent.firstFormGroup.valid).toBeTruthy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const uploadComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    uploadComponent.firstFormGroup.controls[`brand`].setValue('Samsung');
    uploadComponent.firstFormGroup.controls[`model`].setValue('M10');
    uploadComponent.firstFormGroup.controls[`location`].setValue();
    uploadComponent.firstFormGroup.controls[`price`].setValue();
    expect(uploadComponent.firstFormGroup.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const uploadComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    uploadComponent.firstFormGroup.controls[`brand`].setValue('Samsung');
    uploadComponent.firstFormGroup.controls[`model`].setValue();
    uploadComponent.firstFormGroup.controls[`location`].setValue();
    uploadComponent.firstFormGroup.controls[`price`].setValue('1000');
    expect(uploadComponent.firstFormGroup.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const uploadComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    uploadComponent.firstFormGroup.controls[`brand`].setValue();
    uploadComponent.firstFormGroup.controls[`model`].setValue();
    uploadComponent.firstFormGroup.controls[`location`].setValue();
    uploadComponent.firstFormGroup.controls[`price`].setValue();
    expect(uploadComponent.firstFormGroup.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const uploadComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    uploadComponent.secondFormGroup.controls[`ram`].setValue('4');
    uploadComponent.secondFormGroup.controls[`rom`].setValue('2');
    uploadComponent.secondFormGroup.controls[`primaryCamera`].setValue('12');
    uploadComponent.secondFormGroup.controls[`secondaryCamera`].setValue('12');
    uploadComponent.secondFormGroup.controls[`battery`].setValue('1000');
    expect(uploadComponent.secondFormGroup.valid).toBeTruthy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const uploadComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    uploadComponent.secondFormGroup.controls[`ram`].setValue();
    uploadComponent.secondFormGroup.controls[`rom`].setValue();
    uploadComponent.secondFormGroup.controls[`primaryCamera`].setValue('12');
    uploadComponent.secondFormGroup.controls[`secondaryCamera`].setValue('12');
    uploadComponent.secondFormGroup.controls[`battery`].setValue('1000');
    expect(uploadComponent.secondFormGroup.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const uploadComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    uploadComponent.secondFormGroup.controls[`ram`].setValue();
    uploadComponent.secondFormGroup.controls[`rom`].setValue();
    uploadComponent.secondFormGroup.controls[`primaryCamera`].setValue('12');
    uploadComponent.secondFormGroup.controls[`secondaryCamera`].setValue('12');
    uploadComponent.secondFormGroup.controls[`battery`].setValue('1000');
    expect(uploadComponent.secondFormGroup.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const uploadComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    uploadComponent.secondFormGroup.controls[`ram`].setValue();
    uploadComponent.secondFormGroup.controls[`rom`].setValue();
    uploadComponent.secondFormGroup.controls[`primaryCamera`].setValue();
    uploadComponent.secondFormGroup.controls[`secondaryCamera`].setValue();
    uploadComponent.secondFormGroup.controls[`battery`].setValue('1000');
    expect(uploadComponent.secondFormGroup.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const uploadComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    uploadComponent.secondFormGroup.controls[`ram`].setValue('as');
    uploadComponent.secondFormGroup.controls[`rom`].setValue();
    uploadComponent.secondFormGroup.controls[`primaryCamera`].setValue('12');
    uploadComponent.secondFormGroup.controls[`secondaryCamera`].setValue();
    uploadComponent.secondFormGroup.controls[`battery`].setValue();
    expect(uploadComponent.secondFormGroup.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const uploadComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    uploadComponent.secondFormGroup.controls[`ram`].setValue();
    uploadComponent.secondFormGroup.controls[`rom`].setValue('10');
    uploadComponent.secondFormGroup.controls[`primaryCamera`].setValue();
    uploadComponent.secondFormGroup.controls[`secondaryCamera`].setValue('12');
    uploadComponent.secondFormGroup.controls[`battery`].setValue('1000');
    expect(uploadComponent.secondFormGroup.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const uploadComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    uploadComponent.secondFormGroup.controls[`ram`].setValue('123');
    uploadComponent.secondFormGroup.controls[`rom`].setValue('432');
    uploadComponent.secondFormGroup.controls[`primaryCamera`].setValue();
    uploadComponent.secondFormGroup.controls[`secondaryCamera`].setValue('12');
    uploadComponent.secondFormGroup.controls[`battery`].setValue('1000');
    expect(uploadComponent.secondFormGroup.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const uploadComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    uploadComponent.secondFormGroup.controls[`ram`].setValue('2');
    uploadComponent.secondFormGroup.controls[`rom`].setValue('2');
    uploadComponent.secondFormGroup.controls[`primaryCamera`].setValue();
    uploadComponent.secondFormGroup.controls[`secondaryCamera`].setValue('12');
    uploadComponent.secondFormGroup.controls[`battery`].setValue('1000');
    expect(uploadComponent.secondFormGroup.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const uploadComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    uploadComponent.secondFormGroup.controls[`ram`].setValue('2');
    uploadComponent.secondFormGroup.controls[`rom`].setValue('2');
    uploadComponent.secondFormGroup.controls[`primaryCamera`].setValue('2');
    uploadComponent.secondFormGroup.controls[`secondaryCamera`].setValue('12');
    uploadComponent.secondFormGroup.controls[`battery`].setValue('1000');
    expect(uploadComponent.secondFormGroup.valid).toBeTruthy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(MobileUploadComponent);
    const uploadComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    uploadComponent.secondFormGroup.controls[`ram`].setValue();
    uploadComponent.secondFormGroup.controls[`rom`].setValue();
    uploadComponent.secondFormGroup.controls[`primaryCamera`].setValue();
    uploadComponent.secondFormGroup.controls[`secondaryCamera`].setValue();
    uploadComponent.secondFormGroup.controls[`battery`].setValue();
    expect(uploadComponent.secondFormGroup.valid).toBeFalsy();
  });
});
