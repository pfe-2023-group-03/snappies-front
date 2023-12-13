import { Component, OnInit } from '@angular/core';
import { DeliveryService } from './delivery.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit{

  deliveries: any[] = [];

  constructor(private deliveryService : DeliveryService, private navigationService: NavigationService ) { }

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries(): void {
    this.deliveryService.getDeliveries().subscribe(
      (deliveries) => {
        this.deliveries = deliveries.sort((a, b) => a.title - b.title);
      },
      (error) => {
        console.error('Error loading deliveries', error);
      }
    );
  }
  

  navigateTo(route : string): void {
    this.navigationService.navigateTo(route);
  }
}
