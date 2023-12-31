import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiUrlAll = `${environment.apiUrl}/deliveries`;

  constructor(private http: HttpClient) { }

  getDeliveries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlAll);
  }

  getDeliveriesByUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlAll}/users/${userId}`);
  }

  assignDelivery(delivery: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrlAll}/${delivery.id}`, delivery);
  }
}
