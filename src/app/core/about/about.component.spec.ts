import { TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarService} from '../services/snackbar.service';
import { AuthService} from '../../core/auth/auth.service';
import { DetailsInMobileComponent } from './details-in-mobile/details-in-mobile.component';

describe('AboutComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent, DetailsInMobileComponent],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [SnackbarService, AuthService]

    });

  });
  it('About should be created', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    const aboutComponent = fixture.debugElement.componentInstance;
    expect(aboutComponent).toBeTruthy();

  });
});
