import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
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
    return this.http.post(`${this.apiUrl}/orders`, orderData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return throwError('Error: Combination already exists.');
        } else {
          return throwError('Error making order: ' + error.message);
        }
      })
    );
  }

  submitOrderDetail(orderDetailData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/order-details`, orderDetailData);
  }
}
