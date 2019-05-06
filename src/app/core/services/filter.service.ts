import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Mobile } from '../../shared/models/mobile.model';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FilterService implements OnInit {
  private BASE_URL = environment.apiUrl;
  public searchFilterData = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  // ? Manipulating url string to make it as query params.
  public getFilterResult(brand: string[], ram: number[], rom: number[], location: string)
    : Observable<Mobile> {
    let url = `${this.BASE_URL}/mobiles/filter/`;
    if (brand.length) {
      url += 'brand=';
    }
    brand.map(element => {
      url += element + ',';
    });
    if (brand.length) {
      url = url.substring(0, url.length - 1) + '&';
    }

    if (ram.length) {
      url += 'ram=';
    }
    ram.map(element => {
      url += element + ',';
    });
    if (ram.length) {
      url = url.substring(0, url.length - 1) + '&';
    }

    if (rom.length) {
      url += 'rom=';
    }
    rom.map(element => {
      url += element + ',';
    });
    if (rom.length) {
      url = url.substring(0, url.length - 1) + '&';
    }

    url += `location=${location}`;
    return this.http.get<Mobile>(url);
  }

}
