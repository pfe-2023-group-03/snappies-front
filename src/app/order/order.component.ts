import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from './order.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm!: FormGroup;
  clientNames!: any[];
  deliveries!: any[];
  articles!: any[];

  orderError: boolean = false;
  errorMessage: string = '';

  constructor(private orderService: OrderService,private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      clientId: new FormControl('', Validators.required),
      deliveryId: new FormControl('', Validators.required),
      articleId: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    });
    this.loadClientNames();
    this.loadArticles();
    this.loadDeliveries();
  }

  loadClientNames(): void {
    this.orderService.getClientNamesData().subscribe(
      (clients) => {
        this.clientNames = clients;
      },
      (error) => {
        console.error('Error fetching client names:', error);
      }
    );
  }

  loadDeliveries(): void {
    this.orderService.getDeliveriesData().subscribe(
      (deliveries) => {
        this.deliveries = deliveries;
      },
      (error) => {
        console.error('Error fetching deliveries:', error);
      }
    );
  }

  loadArticles(): void {
    this.orderService.getArticlesData().subscribe(
      (articles) => {
        this.articles = articles;
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }

  makeOrder(orderData: any): void {
    this.orderService.submitOrder(orderData).subscribe(
      (orderResponse) => {
        const orderId = orderResponse?.id;  
        if (orderId) {
          this.makeOrderDetails(orderId);
        } else {
          console.error('Error: orderId is undefined in the response.');
        }
      },
      (error) => {
        if (error.status === 500) {
          this.handleError('Error: Combination already exists.');
        } else {
          this.handleError('Error making order details: ' + error.message);
        }
      }
    );
  }
  

  makeOrderDetails(orderId: number): void {
    const orderDetailData = {
      orderId: orderId,
      articleId: this.orderForm.get('articleId')?.value,
      quantity: this.orderForm.get('quantity')?.value,
    };

    this.orderService.submitOrderDetail(orderDetailData).subscribe(
      (orderDetailsResponse) => {
        this.navigationService.navigateTo('/');
      },
      (error) => {
        console.error('Error submitting order details:', error);
      }
    );
  }


  onSubmit(): void {
    if (this.orderForm.valid) {
      const orderData = {
        clientId: this.orderForm.get('clientId')?.value,
        deliveryId: this.orderForm.get('deliveryId')?.value,
        state: 'delivery'
      };
      this.resetErrorState();
      this.makeOrder(orderData);
    }
  }
  
  private handleError(message: string): void {
    this.orderError = true;
    this.errorMessage = message;
  }

  private resetErrorState(): void {
    this.orderError = false;
    this.errorMessage = '';
  }
}
