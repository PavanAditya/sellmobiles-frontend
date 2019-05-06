import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { SocketService } from '../services/socket.service';
import { SearchService } from '../services/search.service';

describe('HeaderComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [ SnackbarService, SocketService, SearchService, UserService]
    });
  });
  it('Headr Component should be created', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const headerComponent = fixture.debugElement.componentInstance;
    expect(headerComponent).toBeTruthy();
  });
  it('should have a instance of userService ', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const userServiceComp = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userServiceComp).toBeTruthy();
  });
  it('should have a instance of snackbarService ', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const snackbarServiceComp = fixture.debugElement.injector.get(SnackbarService);
    fixture.detectChanges();
    expect(snackbarServiceComp).toBeTruthy();
  });
  it('should have a instance of SocketService ', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const authServiceComp = fixture.debugElement.injector.get(SocketService);
    fixture.detectChanges();
    expect(authServiceComp).toBeTruthy();
  });
  it('should have a instance of SearchService ', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const authServiceComp = fixture.debugElement.injector.get(SearchService);
    fixture.detectChanges();
    expect(authServiceComp).toBeTruthy();
  });
  it('should render text button tag', async(() => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('menu');
  }));
});
