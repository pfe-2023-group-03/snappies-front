import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class client {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getClient(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/clients`); 
    }

    postDeliveries(deliveriesData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/deliveries`, deliveriesData);
    }

    postorder(orderData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/orders`, orderData);
    }

  }