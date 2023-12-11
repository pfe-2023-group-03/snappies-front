import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClientNamesData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clients`)
  }

  getDeliveriesData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/deliveries`)
  }

  getArticlesData(): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrl}/articles`)
  }

  submitOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, orderData);
  }

  submitOrderDetail(orderDetailData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/order-details`, orderDetailData);
  }
}
