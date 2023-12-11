import { Component, OnInit } from '@angular/core';
import { ordersDeliveryService } from './ordersDelivery.service';
import { NavigationService } from '../services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-tour',
  templateUrl: './ordersDelivery.component.html',
  styleUrls: ['./ordersDelivery.component.css'],
})
export class ordersDeliveryComponent implements OnInit {

  delivery: any;
  orders: any[] = [];
  clientDetails: any = {};

  constructor(
    private ordersDeliveryService: ordersDeliveryService,
    private navigationService: NavigationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDeliveryAndOrders();
  }

  navigateTo(route: string): void {
    this.navigationService.navigateTo(route);
  }

  getDeliveryAndOrders(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const deliveryId = this.getDeliveryId();
        return this.ordersDeliveryService.getDeliveryAndOrders(Number(deliveryId || ''));
      })
    ).subscribe(
      (data) => {
        this.delivery = data.delivery;
        this.orders = data.orders;
  
        // Récupérer les détails du client pour chaque commande
        this.orders.forEach(order => {
          const clientId = order.clientId;
          this.ordersDeliveryService.getClientOfOrder(clientId).subscribe(
            (client) => {
              this.clientDetails[order.id] = client;
            },
            (error) => {
              console.error('Error loading client of order', error);
            }
          );
        });
      },
      (error) => {
        console.error('Error loading delivery and orders', error);
      }
    );
  }
  

  getDeliveryId(): number {
    let id: number = 0;
    this.route.paramMap.subscribe(params => {
      const idFromUrl = params.get('deliveryId');
      id = idFromUrl ? +idFromUrl : 0;
    });

    return id;
  }

  encodeGoogleMapsAddress(address: string): string {
    return encodeURIComponent(address);
  }

}
