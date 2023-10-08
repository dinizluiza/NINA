import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getComplaints(
    place?: string,
    type?: string,
    moment?: string,
    gender?: string,
    age?: number
  ): Observable<any[]> {
    let params = new HttpParams();
    if (place) {
      params = params.set('place', place);
    }
    if (type) {
      params = params.set('type', type);
    }
    if (moment) {
      params = params.set('at_moment', moment);
    }
    if (gender) {
      params = params.set('victim_gender', gender);
    }
    if (age) {
      params = params.set('victim_age', age.toString());
    }
    return this.http.get<any[]>(`${this.apiUrl}/complaints`, { params });
  }
}
