import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiUrlAll = 'http://localhost:3000/deliveries';

  constructor(private http: HttpClient) { }

  getDeliveries(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrlAll);
  }

}
