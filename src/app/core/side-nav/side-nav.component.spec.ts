import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarService } from '../services/snackbar.service';
import { AuthService } from '../auth/auth.service';

describe('SideNavComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavComponent],
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
  it('Side Nav Component should be created', () => {
    const fixture = TestBed.createComponent(SideNavComponent);
    const sideNavCompo = fixture.debugElement.componentInstance;
    expect(sideNavCompo).toBeTruthy();

  });
  it('should render text button tag', async(() => {
    const fixture = TestBed.createComponent(SideNavComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('menu');
  }));
});
