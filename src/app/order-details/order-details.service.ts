import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  
  constructor(private http: HttpClient) { }

  getOrder(id: any) {
    return this.http.get(`http://localhost:3000/orders/${id}`);
  }

  getClient(clientId: any) {
    return this.http.get(`http://localhost:3000/clients/${clientId}`);
  }

  getOrderDetails(id: any) {
    return this.http.get(`http://localhost:3000/order-details/${id}`);
  }
}
