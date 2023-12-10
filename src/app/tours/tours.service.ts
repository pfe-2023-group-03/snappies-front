import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  private apiUrl = 'http://localhost:3000/'; // Replace with your NestJS API endpoint

  constructor(private http: HttpClient) { }

  getDelivery(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  startTour(id : number): Observable<boolean> {
    //return this.http.put<any>(this.apiUrl + '/deliveries/id' + id, {state: 'D'});
    console.log("startTour");
    return of(true);
  }

}
