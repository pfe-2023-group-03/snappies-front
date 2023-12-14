import { Component, OnInit } from '@angular/core';
import { DeliveryService } from './delivery.service';
import { NavigationService } from '../services/navigation.service';
import { AuthenticationService } from '../authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit{

  deliveries: any[] = [];

  constructor(private deliveryService : DeliveryService, private navigationService: NavigationService, private authenticationService : AuthenticationService, private dialog : MatDialog) { }

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

  assignDelivery(delivery: any): void {
    const response = this.hasDelivery();
    if (response !== null && response !== undefined) {
      this.openDialog('Vous avez déjà une livraison en cours.');
      return;
    }
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

  openDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: {errorMessage: errorMessage}
    });
  }

  navigateTo(route : string): void {
    this.navigationService.navigateTo(route);
  }

  isAdmin() {
    return this.authenticationService.getUser().role === 'admin';
  }

  async hasDelivery(): Promise<any> {
    return new Promise((resolve, reject) => {
      const user = this.authenticationService.getUser();
      this.deliveryService.getDeliveriesByUser(user.id).subscribe(
        (deliveries) => {
          if (deliveries.length > 0) {
            resolve(deliveries[0]);
          } else {
            resolve(null);
          }
        },
        (error) => {
          console.error('Error loading deliveries', error);
          reject(error);
        }
      );
    });
  }
  
  async onFabClick(): Promise<void> {
    try {
      const delivery = await this.hasDelivery();
      console.log(delivery);
      
      if (delivery !== null && delivery !== undefined) {
        this.navigationService.navigateTo('delivery/' + delivery.id);
      }
    } catch (error) {
      console.error('Error checking for delivery', error);
    }
  }
  
}
