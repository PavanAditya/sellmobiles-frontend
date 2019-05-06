import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SnackbarService } from '../../core/services/snackbar.service';
import { AuthService } from '../../core/auth/auth.service';
describe('ContactComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactComponent],
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
  it('Contact Component should be created', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const contactComponent = fixture.debugElement.componentInstance;
    expect(contactComponent).toBeTruthy();

  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const contactComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    contactComponent.contactUsForm.controls[`userName`].setValue('abc');
    contactComponent.contactUsForm.controls[`email`].setValue('abc@abc.com');
    contactComponent.contactUsForm.controls[`choice`].setValue('query');
    contactComponent.contactUsForm.controls[`query`].setValue('abc');
    expect(contactComponent.contactUsForm.valid).toBeTruthy();
  });

  it(`form should be valid`, () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const contactComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    contactComponent.contactUsForm.controls[`userName`].setValue('abc');
    contactComponent.contactUsForm.controls[`email`].setValue('abc@abc.com');
    contactComponent.contactUsForm.controls[`choice`].setValue('rating');
    contactComponent.contactUsForm.controls[`feedBack`].setValue('3');
    expect(contactComponent.contactUsForm.valid).toBeTruthy();
  });

  it(`form should be valid`, () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const contactComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    contactComponent.contactUsForm.controls[`userName`].setValue('abc');
    contactComponent.contactUsForm.controls[`email`].setValue('abc@abc.com');
    contactComponent.contactUsForm.controls[`choice`].setValue('rating');
    contactComponent.contactUsForm.controls[`feedBack`].setValue('3');
    expect(contactComponent.contactUsForm.valid).toBeTruthy();
  });

  it(`form should be valid`, () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const contactComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    contactComponent.contactUsForm.controls[`userName`].setValue('abc');
    contactComponent.contactUsForm.controls[`email`].setValue();
    contactComponent.contactUsForm.controls[`choice`].setValue();
    contactComponent.contactUsForm.controls[`feedBack`].setValue();
    expect(contactComponent.contactUsForm.valid).toBeTruthy();
  });

  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const contactComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    contactComponent.contactUsForm.controls[`userName`].setValue('abc acd');
    contactComponent.contactUsForm.controls[`email`].setValue();
    contactComponent.contactUsForm.controls[`choice`].setValue();
    contactComponent.contactUsForm.controls[`feedBack`].setValue();
    expect(contactComponent.contactUsForm.valid).toBeFalsy();
  });

  it(`form should be valid`, () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const contactComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    contactComponent.contactUsForm.controls[`userName`].setValue();
    contactComponent.contactUsForm.controls[`email`].setValue('abc@abc.com');
    contactComponent.contactUsForm.controls[`choice`].setValue();
    contactComponent.contactUsForm.controls[`feedBack`].setValue();
    expect(contactComponent.contactUsForm.valid).toBeTruthy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const contactComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    contactComponent.contactUsForm.controls[`userName`].setValue('abc');
    contactComponent.contactUsForm.controls[`email`].setValue('abcabc.com');
    contactComponent.contactUsForm.controls[`choice`].setValue('query');
    contactComponent.contactUsForm.controls[`query`].setValue('abc');
    expect(contactComponent.contactUsForm.valid).toBeFalsy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const contactComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    contactComponent.contactUsForm.controls[`userName`].setValue('abc');
    contactComponent.contactUsForm.controls[`email`].setValue('');
    contactComponent.contactUsForm.controls[`choice`].setValue('query');
    contactComponent.contactUsForm.controls[`query`].setValue('abc');
    expect(contactComponent.contactUsForm.valid).toBeTruthy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const contactComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    contactComponent.contactUsForm.controls[`userName`].setValue('');
    contactComponent.contactUsForm.controls[`email`].setValue('');
    contactComponent.contactUsForm.controls[`choice`].setValue('query');
    contactComponent.contactUsForm.controls[`query`].setValue('abc');
    expect(contactComponent.contactUsForm.valid).toBeTruthy();
  });
  it(`form should be invalid`, () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const contactComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    contactComponent.contactUsForm.controls[`userName`].setValue('abc');
    contactComponent.contactUsForm.controls[`email`].setValue('abc@abccom');
    contactComponent.contactUsForm.controls[`choice`].setValue('query');
    contactComponent.contactUsForm.controls[`query`].setValue('abc');
    expect(contactComponent.contactUsForm.valid).toBeFalsy();
  });
  it(`form should be valid`, () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const contactComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    contactComponent.contactUsForm.controls[`userName`].setValue();
    contactComponent.contactUsForm.controls[`email`].setValue();
    contactComponent.contactUsForm.controls[`choice`].setValue();
    contactComponent.contactUsForm.controls[`feedBack`].setValue('1');
    expect(contactComponent.contactUsForm.valid).toBeTruthy();
  });
  it(`form should be valid`, () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const contactComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    contactComponent.contactUsForm.controls[`userName`].setValue();
    contactComponent.contactUsForm.controls[`email`].setValue();
    contactComponent.contactUsForm.controls[`choice`].setValue();
    contactComponent.contactUsForm.controls[`query`].setValue('abcdef ijkl 123');
    expect(contactComponent.contactUsForm.valid).toBeTruthy();
  });

  it('should have a instance of snackbarService ', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const snackbarServiceComp = fixture.debugElement.injector.get(SnackbarService);
    fixture.detectChanges();
    expect(snackbarServiceComp).toBeTruthy();
  });
  it('should have a instance of authService ', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const authServiceComp = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
    expect(authServiceComp).toBeTruthy();
  });
  it('should render text h2 tag', async(() => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Help us to improve better');
  }));
  it('should render text button tag', async(() => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Send');
  }));
});
