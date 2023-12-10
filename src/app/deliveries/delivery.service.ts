import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiUrl = 'http://localhost:3000/deliveries'; 

  constructor(private http: HttpClient) { }

  // getDeliveries(): Observable<any[]> {
  //   const response = this.http.get<any[]>(this.apiUrl);
  //   if(...) {
  //     const deliveries = document.getElementsByClassName('deliveries-container');
  //     deliveries[0].innerHTML = '<h1>There are no deliveries to display</h1>';
  //   }
  //   return response;
  // }

  getDeliveries(): Observable<any[]> {
    const deliveries = document.getElementsByClassName('deliveries-container');

    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error: HttpResponse<any>) => {
        if (error.status === 401) {
          deliveries[0].innerHTML = '<p id="error">Vous ne pouvez pas acceder a cette page</p>';
          
        } else {
          const deliveries = document.getElementsByClassName('deliveries-container');
          deliveries[0].innerHTML = '<p id= "deliveries-ok">There was an error or no deliveries to display</p>';
        }
        return throwError(error);
      })
    );
  }
}
