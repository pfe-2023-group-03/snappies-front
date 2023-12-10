import { Component, OnInit } from '@angular/core';
import { Order, OrderState } from './Order';
import { Client } from './Client';
import { ToursService } from './tours.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css'],
})
export class ToursComponent implements OnInit {
  tour : string = '2';
  orders: Order[];
  client1: Client;
  client2 : Client;
  client3 : Client;
  
  //array of artciles with quantity
  articles: any[] = [{label: 'couche S', quantity: 3}, {label: 'Sac poubelles', quantity: 4}, {label: 'Essuies', quantity: 2}];

  constructor(private ToursService: ToursService) {
    // Initialisez votre liste de livraisons ici (par exemple, à partir d'un service)
    this.client1 = {id: 1, number: 'cre-1710', name: 'creche des lumières', address: '1 avenue des projecteurs, 1710', phone: '+32495316845'};
    this.client2 = {id: 2, number: 'cre-1711', name: 'hop st ju', address: '92 av. ouvrière, 1962', phone: '+32434697520'};
    this.client3 = {id: 3, number: 'cre-1712', name: 'creche des lumières', address: '1 avenue des projecteurs, 1710', phone: '+32495316845'};
    this.orders = [
      {
        id: 1,
        state: OrderState.InDelivery,
        client: this.client1,
        delivery: 'Paris',
      },
      {
        id: 2,
        state: OrderState.Terminate,
        client: this.client2,
        delivery: 'Lyon',
      },
      {
        id: 3,
        state: OrderState.Surplus,
        client: this.client3,
        delivery: 'Marseille',
      },
    ];
  }

  ngOnInit(): void {
    /*this.ToursService.getDelivery().subscribe((orders) => {
      this.orders = orders;
    });
    */
  }

  startTour(tour : number): void {
    this.ToursService.startTour(tour).subscribe((order) => {
      tour;
    }
  )}
}
