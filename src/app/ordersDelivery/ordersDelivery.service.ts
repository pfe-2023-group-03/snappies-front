import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ordersDeliveryService {
  private apiUrl = environment.apiUrl; // Replace with your NestJS API endpoint

  constructor(private http: HttpClient) { }

  getDelivery(id : number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/deliveries/${id}`); 
  }

  getOrdersOfDelivery(id : number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/orders/delivery/${id}`);
  }

  getDeliveryAndOrders(id: number): Observable<any> {
    return forkJoin({
      delivery: this.getDelivery(id),
      orders: this.getOrdersOfDelivery(id)
    });
  }

  getClientOfOrder(clientId: any): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/clients/${clientId}`);
  }
  
}
