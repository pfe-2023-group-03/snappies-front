import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ordersDeliveryService {
  private apiUrl = environment.apiUrl;

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

  getDeliveryBoxes(orderId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/order-details/sumQuantityOfOrder/${orderId}`, {});
  }

  getOrders(orders : any[]): any[] {
    return orders;
  }

  getArticles(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/articles`);
  }

  getArticle(articleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/articles/${articleId}`);
  }

  getOrderDetails(orderId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/order-details/${orderId}`);
  }

  updateDeliveryStatus(deliveryId: number, state: string): Observable<any> {
    const body = {
      state
    };
    return this.http.patch<any>(`${this.apiUrl}/deliveries/${deliveryId}`, body);
  }
  
  
}
