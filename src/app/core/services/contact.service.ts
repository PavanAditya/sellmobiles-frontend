import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Contact } from '../../shared/models/contact-us.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private BASE_URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // ? Sending feedback or query to backend.
  public sendFeedback(contactUsForm: Contact): Observable<Response> {
    return this.http.post<Response>(`${this.BASE_URL}/users/feedback`, contactUsForm);
  }
}
