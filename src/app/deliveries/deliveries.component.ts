import { Component, OnInit } from '@angular/core';
import { DeliveryService } from './delivery.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit{

  deliveries: any[] = [];

  constructor(private deliveryService : DeliveryService) { }

  ngOnInit(): void {
    this.deliveryService.getDeliveries().subscribe((deliveries) => {
      this.deliveries = deliveries;
    }
  )}
}
