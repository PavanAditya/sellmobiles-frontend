import { TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {SnackbarService} from '../../core/services/snackbar.service';
import {AuthService} from '../../core/auth/auth.service';
describe('FooterComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
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
  it('Footer  should be created', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const footerComponent = fixture.debugElement.componentInstance;
    expect(footerComponent).toBeTruthy();

  });
  it('should have a instance of snackbarService ', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const snackbarServiceComp = fixture.debugElement.injector.get(SnackbarService);
    fixture.detectChanges();
    expect(snackbarServiceComp).toBeTruthy();
  });
  it('should have a instance of authService ', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const authServiceComp = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
    expect(authServiceComp).toBeTruthy();
  });

});
