import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterService } from '../../../core/services/filter.service';
import { SearchService } from '../../../core/services/search.service';
import { mobileInformation } from '../../../core/mocks/mobile-information.mock';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public productsByBrand: string[] = [];
  public productsByRam: number[] = [];
  public productsByRom: number[] = [];
  public location = 'India';
  public mobileInformation = mobileInformation;
  public filterForm: FormGroup;

  constructor(
    private filterService: FilterService,
    private searchService: SearchService
  ) { }
  ngOnInit() {
    this.filterForm = new FormGroup({
      brand: new FormControl(''),
      ram: new FormControl(''),
      rom: new FormControl('')
    });
    this.searchService.updateFilterItems.subscribe((res) => {
      this.productsByBrand = [];
      this.filterForm.reset();
    });
  }

  // ? Filling the brand array with checked brand names.
  public brandResult(event, brand: string): void {
    if (event.checked) {
      this.productsByBrand.push(brand);
    } else {
      this.productsByBrand = this.productsByBrand.filter(element => {
        if (element !== brand) {
          return element;
        }
      });
    }
    this.filterApply();
  }

  // ? Filling the ram array with checked ram.
  public ramResult(event, ram: number): void {
    if (event.checked) {
      this.productsByRam.push(ram);
    } else {
      this.productsByRam = this.productsByRam.filter(element => {
        if (element !== ram) {
          return element;
        }
      });
    }
    this.filterApply();
  }

  // ? Filling the rom array with checked rom.
  public romResult(event, rom: number): void {
    if (event.checked) {
      this.productsByRom.push(rom);
    } else {
      this.productsByRom = this.productsByRom.filter(element => {
        if (element !== rom) {
          return element;
        }
      });
    }
    this.filterApply();
  }

  // ? Sending the brand, ram, rom array to the filter service.
  public filterApply(): void {
    this.location = this.searchService.fetchLocation();
    this.searchService.clearSearch.next(true);
    this.filterService.getFilterResult(
      this.productsByBrand,
      this.productsByRam,
      this.productsByRom,
      this.location
    ).subscribe((response) => {
      this.filterService.searchFilterData.next(response);
    });
  }
}
