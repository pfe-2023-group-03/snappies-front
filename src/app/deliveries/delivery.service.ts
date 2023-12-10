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
      return this.http.get<any[]>(this.apiUrlAll).pipe(
      catchError((error: HttpResponse<any>) => {
        if (error.status === 401) {
          const deliveries = document.getElementsByClassName('deliveries-container');
          deliveries[0].innerHTML = '<p id="error">Vous ne pouvez pas acceder a cette page</p>';
          
        }
        return throwError(error);
      })
    );
  }

}
