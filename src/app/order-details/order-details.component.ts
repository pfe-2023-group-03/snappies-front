import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { environment } from 'src/environments/environment';
import { OrderDetailsService } from './order-details.service';
import { NavigationService } from '../services/navigation.service';
import { forkJoin } from 'rxjs';
import { ordersDeliveryService } from '../ordersDelivery/ordersDelivery.service'

import { MatDialog } from '@angular/material/dialog';
import { OrderConfirmationDialogComponent } from '../order-confirmation-dialog/order-confirmation-dialog.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  isLoading: boolean = true;
  displayedColumns: string[] = ['name', 'quantity', 'actions'];
  articleNameMap: Map<number, string> = new Map();
  orderState: string = '';  
  confirmationDialogOpen: boolean = false;

  private readonly API_URL = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private orderDetailsService: OrderDetailsService,
    private navigationService: NavigationService,
    private authService : AuthenticationService,
    private changeDetectorRef: ChangeDetectorRef,
    private ordersdeliveryService: ordersDeliveryService,
    private dialog: MatDialog
  ) {}

  

  ngOnInit(): void {
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    const id = this.route.snapshot.paramMap.get('id');
  
    this.orderDetailsService.getOrder(id).subscribe(
      (order) => {
        this.order = order;

        forkJoin([
          this.orderDetailsService.getClient(this.order.clientId),
          this.orderDetailsService.getOrderDetails(this.order.id)
        ]).subscribe(
          ([client, orderDetails]) => {
            this.order.client = client;
            this.order.orderDetails = orderDetails;
            console.log('orderDetails', orderDetails);

            this.order.orderDetails.forEach((detail:any) => {
              detail.quantityToShow = detail.quantity + detail.surplusQuantity;
              this.getArticleName(detail.articleId);
            });

            this.isLoading = false;
          },
          (error) => {
            console.error(error);
            this.isLoading = false;
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }


  getArticleName(articleId: number): void {
    this.orderDetailsService.getArticle(articleId).subscribe(
      (article) => {
        this.articleNameMap.set(articleId, article.label);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  toggleEdit(element: any): void {
    element.editing = !element.editing;
    if (element.editing) {
      element.newQuantity = element.quantity;
      element.orderId = element.orderId;
      element.articleId = element.articleId;
    }
  }

  saveQuantity(element: any): void {
    try {
      const { orderId, articleId, newQuantity, quantityToShow, quantity } = element;
      const quantityToAdd = newQuantity - quantityToShow;
      let isPreparation = false;
  
      const deliveryId = this.order.deliveryId;

      this.ordersdeliveryService.getDelivery(deliveryId).subscribe(
        (response) => {
          const delivery = response;  
          if(delivery.state === 'preparation') {
            isPreparation = true;
            console.log('isPreparation true : ',isPreparation);
            this.ordersdeliveryService.updateSurplusQuantity(deliveryId, articleId, quantityToAdd, isPreparation).subscribe(
              (reponse) =>{
                this.orderDetailsService.updateOrderDetails(orderId, articleId, quantityToAdd).subscribe(
                  ()=>{
                    this.loadOrderDetails();
                  }
                );
              },
              (error) => {
                return error;
              }
            );
          }else{
            console.log('isPreparation false : ',isPreparation);
            this.ordersdeliveryService.updateSurplusQuantity(deliveryId, articleId, quantityToAdd, isPreparation).subscribe(
              (reponse) => {
                this.orderDetailsService.updateOrderDetails(orderId, articleId, quantityToAdd).subscribe(
                  ()=>{
                    this.loadOrderDetails();
                  }
                );
              },
              (error) => {
                return error;
              }
            );;
          }
        }
      );
  
      element.quantity = quantityToShow + quantityToAdd;
      element.editing = false;

    } catch (error) {
      console.error('Error saving quantity:', error);
    }
  }
  

  isUserAdmin(): boolean {
    const user = this.authService.getUser();
    return user?.role === 'admin';
  }

  openConfirmationDialog(): void {
    this.confirmationDialogOpen = true;
  }

  cancelConfirmation(): void {
    this.confirmationDialogOpen = false;
  }

  confirmValidation(): void {
    this.confirmationDialogOpen = false;
    this.changeStatusToDone();
  }

  changeStatusToDone(): void {
    const dialogRef = this.dialog.open(OrderConfirmationDialogComponent, {
      width: '400px',
      data: {
        order: this.order,
        articleNameMap: this.articleNameMap,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked "Valider" in the dialog
        this.orderDetailsService.updateOrderStatus(this.order).subscribe(
          (response) => {
            this.orderState = 'done';
            this.changeDetectorRef.detectChanges();
            const numDelivery = this.order.deliveryId;
            this.navigationService.navigateTo('/delivery/' + numDelivery);
          },
          (error) => {
            console.error('Error updating order status:', error);
          }
        );
      }
    });
  }

  // changeStatusToDone(): void {
  //   this.orderDetailsService.updateOrderStatus(this.order).subscribe(
  //     (response) => {
  //       this.orderState = 'done';
  //       this.changeDetectorRef.detectChanges();
  //     },
  //     (error) => {
  //       console.error('Error updating order status:', error);
  //     }
  //   );
  // }

}