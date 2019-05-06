import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StatComponent } from './stat.component';
import { MaterialModule } from '../material.module';

describe('StatComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule
      ],
      providers: []
    });
  });
});
