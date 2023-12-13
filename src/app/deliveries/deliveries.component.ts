import { Component, OnInit } from '@angular/core';
import { DeliveryService } from './delivery.service';
import { NavigationService } from '../services/navigation.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit{

  deliveries: any[] = [];

  constructor(private deliveryService : DeliveryService, private navigationService: NavigationService, private authenticationService : AuthenticationService) { }

  ngOnInit(): void {
    // Check if user has a delivery assigned
    const user = this.authenticationService.getUser();
    this.deliveryService.getDeliveriesByUser(user.id).subscribe(
      (deliveries) => {
        console.log('Deliveries', deliveries);
        
        if (deliveries.length > 0) {
          this.navigationService.navigateTo('delivery/' + deliveries[0].id);
        }
      },
      (error) => {
        console.error('Error loading deliveries', error);
      }
    );

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

  assignDelivery(delivery: any): void {
    delivery.userId = this.authenticationService.getUser().id;

    this.deliveryService.assignDelivery(delivery).subscribe(
      (response) => {
        this.navigationService.navigateTo('delivery/' + delivery.id);
      },
      (error) => {
        console.error('Error assigning delivery', error);
      }
    );
  }


  navigateTo(route : string): void {
    this.navigationService.navigateTo(route);
  }

  isAdmin() {
    return this.authenticationService.getUser().role === 'admin';
  }
}
