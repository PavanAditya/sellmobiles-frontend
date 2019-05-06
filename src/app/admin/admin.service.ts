import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { RegisteredUser } from '../shared/models/registered-user.model';
import { UsersCount } from '../shared/models/users-count.model';
import { LikedImagesResponse } from '../shared/models/liked-images-response.model';
import { ResponseBack } from '../shared/models/response-back.model';
import { ChartsResponse } from '../shared/models/charts-response.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public updateMobileData = new BehaviorSubject(null);
  private BASE_URL = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) { }

  public userDetails(): Observable<RegisteredUser> {
    return this.http.get<RegisteredUser>(`${this.BASE_URL}/registered-users`);
  }

  public countUserDetails(): Observable<UsersCount> {
    return this.http.get<UsersCount>(`${this.BASE_URL}/count-registered-users`);
  }

  public onlineUserDetails(): Observable<RegisteredUser> {
    return this.http.get<RegisteredUser>(`${this.BASE_URL}/online-users`);
  }

  public countOnlineUserDetails(): Observable<UsersCount> {
    return this.http.get<UsersCount>(`${this.BASE_URL}/count-online-users`);
  }

  public countTotalPosts(): Observable<UsersCount> {
    return this.http.get<UsersCount>(`${this.BASE_URL}/total-posts`);
  }

  public countTotalMobilesSold(): Observable<UsersCount> {
    return this.http.get<UsersCount>(`${this.BASE_URL}/sold-mobiles-count`);
  }

  public topLikedImages(): Observable<LikedImagesResponse> {
    return this.http.get<LikedImagesResponse>(`${this.BASE_URL}/top-liked-posts`);
  }

  public deletePost(id: string): Observable<ResponseBack> {
    return this.http.delete<ResponseBack>(`${this.BASE_URL}/delete-post/` + id);
  }

  public getBarchartData(): Observable<ChartsResponse> {
    return this.http.get<ChartsResponse>(`${this.BASE_URL}/mobiles-count`);
  }

  public getPiechartData(): Observable<ChartsResponse> {
    return this.http.get<ChartsResponse>(`${this.BASE_URL}/mobiles-likes-count`);
  }

  public getDoughnutData(): Observable<ChartsResponse> {
    return this.http.get<ChartsResponse>(`${this.BASE_URL}/mobiles-location-count`);
  }

}
