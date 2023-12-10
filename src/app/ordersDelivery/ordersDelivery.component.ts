import { Component, OnInit } from '@angular/core';
import { Order, OrderState } from './Order';
import { Client } from './Client';
import { ordersDeliveryService } from './ordersDelivery.service';
import { NavigationService } from '../services/navigation.service';
import { ArticleOrder } from './ArticleOrder';
import { Delivery, DeliveryState } from './Delivery';

@Component({
  selector: 'app-tour',
  templateUrl: './ordersDelivery.component.html',
  styleUrls: ['./ordersDelivery.component.css'],
})
export class ordersDeliveryComponent implements OnInit {
  delivery! : Delivery;

  tour : string = '1';
  
  constructor(private ordersDeliveryService: ordersDeliveryService, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.ordersDeliveryService.getDelivery().subscribe((delivery) => {
      this.delivery = delivery;
    });
    
  }

  startTour(tour : number): void {
    this.ordersDeliveryService.startTour(tour).subscribe((order) => {
      tour;
    }
  )}

  navigateTo(route: string): void {
    this.navigationService.navigateTo(route);
  }
}
