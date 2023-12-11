import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Delivery, DeliveryState } from './Delivery';
import { ArticleOrder } from './ArticleOrder';
import { Order, OrderState } from './Order';
import { Client } from './Client';
import { AuthenticationService } from '../authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ordersDeliveryService {
  private apiUrl = environment.apiUrl; // Replace with your NestJS API endpoint

  constructor(private http: HttpClient, private authenticationService : AuthenticationService) { }

  getDelivery(id : number): Observable<any[]> {
console.log("service --> getDelivery: " + this.apiUrl + '/deliveries/' + id);
    return this.http.get<any>(this.apiUrl + '/deliveries/' + id)/* .pipe(
      catchError((error: HttpResponse<any>) => {
        if (error.status === 401) {
          const deliveries = document.getElementsByClassName('delivery-head');
          deliveries[0].innerHTML = '<p id="error">Vous ne pouvez pas acceder a cette page</p>';
        }
        return throwError(error);
      }) 
    )*/; 
    //return of(this.initData());
  }

  startTour(id : number): Observable<boolean> {
    return this.http.patch<any>(this.apiUrl + '/deliveries/id' + id, {state: 'D'});
    console.log("service --> startTour");
    //return of(true);
  }

  articles!: ArticleOrder[]
  orders!: Order[];
  client1!: Client;
  client2!: Client;
  client3! : Client;

  initData(): Delivery {
    this.client1 = {id: 1, number: 'cre-1710', name: 'creche des lumières', address: '1 avenue des projecteurs, 1710', phone: '+32495316845'};
    this.client2 = {id: 2, number: 'cre-1711', name: 'hop st ju', address: '92 av. ouvrière, 1962', phone: '+32434697520'};
    this.client3 = {id: 3, number: 'cre-1712', name: 'creche des lumières', address: '1 avenue des projecteurs, 1710', phone: '+32495316845'};

    this.articles = [
      {id: 1, label: 'couche S', quantity: 3},
      {id: 2, label: 'Sac poubelles', quantity: 4},
      {id: 3, label: 'Essuies', quantity: 2}
    ];

    this.orders = [
      {
        id: 1,
        state: OrderState.InDelivery,
        client: this.client1,
        articles: this.articles,
      },
      {
        id: 2,
        state: OrderState.Terminate,
        client: this.client2,
        articles: this.articles,
      },
      {
        id: 3,
        state: OrderState.Surplus,
        client: this.client3,
        articles: this.articles,
      },
      {
        id: 4,
        state: OrderState.InDelivery,
        client: this.client3,
        articles: this.articles,        
      },
    ];

    return {
      id: 1,
      user: 'user1',
      state: DeliveryState.Preparation,
      title: 'tournée 1',
      orders : this.orders,
    }
  }

}
