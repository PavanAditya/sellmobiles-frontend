import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { FilterService } from '../../../core/services/filter.service';
import { SearchService } from '../../../core/services/search.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../modules/material.module';

describe('FilterComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [ HttpClientTestingModule, RouterTestingModule, RouterModule, ReactiveFormsModule, FormsModule, MaterialModule ],
      providers: [FilterService, SearchService ]
    });
  });

  it('Mobile Detail Component should be created', () => {
    const fixture = TestBed.createComponent(FilterComponent);
    const filtercompo = fixture.debugElement.componentInstance;
    expect(filtercompo).toBeTruthy();
  });
  it('should have a instance of filterService ', () => {
    const fixture = TestBed.createComponent(FilterComponent);
    const filterServiceComp = fixture.debugElement.injector.get(FilterService);
    fixture.detectChanges();
    expect(filterServiceComp).toBeTruthy();
  });
  it('should have a instance of searchService ', () => {
    const fixture = TestBed.createComponent(FilterComponent);
    const searchServiceComp = fixture.debugElement.injector.get(SearchService);
    fixture.detectChanges();
    expect(searchServiceComp).toBeTruthy();
  });
});
