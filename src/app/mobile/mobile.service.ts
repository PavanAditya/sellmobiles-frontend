import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Mobile } from '../shared/models/mobile.model';
import { Brand } from '../shared/models/brand.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  public updateMobileList = new BehaviorSubject(null);
  public mobilePostId = new BehaviorSubject(null);
  private BASE_URL = environment.apiUrl + '/mobiles';
  private brandListner: Brand[];

  constructor(private http: HttpClient) {}

  // ? Retuning all the mobile list from database
  public mobilesList(): Observable<Response> {
    return this.http.get<Response>(`${this.BASE_URL}/list`);
  }

  // ? Returning all the brand names from database
  public brands(): Observable<Response> {
    return this.http.get<Response>(`${this.BASE_URL}/names`);
  }

  // ? Posting the mobile details to databse.
  public saveFormData(form: Mobile): Observable<Response> {
    return this.http.post<Response>(`${this.BASE_URL}/new`, form);
  }

  // ? Updating the wishlist
  public updateLike(mobile: Mobile): Observable<Mobile> {
    return this.http.put<Mobile>(`${this.BASE_URL}/wishlist`, mobile);
  }

  public deletePost(postId: string): Observable<Response> {
    return this.http.delete<Response>(`${this.BASE_URL}/deletemobile/${postId}`);
  }

  public updateSoldPost(postId: string, buyerUserName: string): Observable<Response> {
    return this.http.put<Response>(`${this.BASE_URL}/updatesoldmobile/${postId}`, { buyerUserName });
  }

  public brandlistner(): Brand[] {
    return this.brandListner;
  }
  public updatePrice(id: string, price: string): Observable<Response> {
    return this.http.put<Response>(`${this.BASE_URL}/mobiles/update/${id}`, { price });
  }
  // ! for mobile details
  public getMobileDetailsById(mobileId): Observable<Response> {
    return this.http.get<Response>(`${this.BASE_URL}/description/${mobileId}`);
  }

  public checkBuyerName(mobilesLists): Mobile[] {
    const mobilesList = mobilesLists.filter((mobile) => {
      if (mobile.buyerUserName === '') {
        return mobile;
      }
    });
    return mobilesList;
    }
}
