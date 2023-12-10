import { Component, OnInit } from '@angular/core';
import { Order, OrderState } from './Order';
import { Client } from './Client';
import { ordersDeliveryService } from './ordersDelivery.service';
import { NavigationService } from '../services/navigation.service';
import { ArticleOrder } from './ArticleOrder';
import { Delivery, DeliveryState } from './Delivery';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tour',
  templateUrl: './ordersDelivery.component.html',
  styleUrls: ['./ordersDelivery.component.css'],
})
export class ordersDeliveryComponent implements OnInit {
  delivery! : Delivery;

  tour : string = '2';
  
  constructor(private ordersDeliveryService: ordersDeliveryService, private navigationService: NavigationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let deliveryId: number = 0; // Declare deliveryId using the let keyword

    this.route.params.subscribe(params => {
      // Utilisez params pour accéder aux valeurs passées dans la route
      deliveryId = params['deliveryId'];
      console.log(deliveryId);
    });

    this.ordersDeliveryService.getDelivery(deliveryId).subscribe((delivery) => { // Use the updated deliveryId variable here
      this.delivery = delivery;
    });
    
  }

  startTour(tour : number): void {
    this.ordersDeliveryService.startTour(tour).subscribe((order) => {
      tour;
      /* this.ordersDeliveryService.getDelivery(this.delivery.id).subscribe((updatedDelivery) => {
        this.delivery = updatedDelivery;
      }); */
      this.delivery.state = DeliveryState.Delivery;
    })
    
    console.log("component --> startTour " + this.delivery.state);
  }

  navigateTo(route: string): void {
    this.navigationService.navigateTo(route);
  }
}
