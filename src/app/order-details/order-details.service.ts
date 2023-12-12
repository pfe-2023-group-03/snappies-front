import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  
  constructor(private http: HttpClient) { }

  apiUrl = environment.apiUrl;

  getOrder(id: any) {
    return this.http.get(`${this.apiUrl}/orders/${id}`);
  }

  getClient(clientId: any) {
    return this.http.get(`${this.apiUrl}/clients/${clientId}`);
  }

  getOrderDetails(id: any) {
    return this.http.get(`${this.apiUrl}/order-details/${id}`);
  }

  getArticle(articleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/articles/${articleId}`);
  }

  updateOrderDetails(orderId: number, articleId: number, newQuantity: number) {
    const body = {
      quantity: newQuantity,
      default: false
    }
    return this.http.patch(`${this.apiUrl}/order-details/updateQuantity/${orderId}/${articleId}`, body);
  }

  updateOrderStatus(order: any): Observable<any> {
    const state = 'done';
    const body = { state };
  
    return this.http.patch(`${this.apiUrl}/orders/${order.id}`, body);
  }
}
