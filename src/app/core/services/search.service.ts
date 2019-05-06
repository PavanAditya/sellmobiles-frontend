import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Mobile } from '../../shared/models/mobile.model';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public location = 'India';
  public searchResult: Mobile[] = [];
  public updateData = new BehaviorSubject(null);
  public updateFilterItems = new BehaviorSubject(null);
  public clearSearch = new BehaviorSubject(null);
  private BASE_URL = environment.apiUrl;
  private searchCity = `${this.BASE_URL}/mobiles/city`;
  private searchBrand = `${this.BASE_URL}/mobiles/brands`;

  constructor(
    private http: HttpClient,
  ) { }

  public fetchLocation(): string {
    return this.location;
  }
  // ? Sending the search brand / location to bakend.
  public fetchResultList(search): Observable<Mobile> {
    if (search[1] === '') {
      return this.http.post<Mobile>(this.searchCity, search);
    } else {
      return this.http.post<Mobile>(this.searchBrand, search);
    }
  }
}
