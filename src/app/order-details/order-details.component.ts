import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { environment } from 'src/environments/environment';
import { OrderDetailsService } from './order-details.service';
import { NavigationService } from '../services/navigation.service';
import { forkJoin } from 'rxjs';

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

  private readonly API_URL = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private orderDetailsService: OrderDetailsService,
    private navigationService: NavigationService,
    private authService : AuthenticationService,
    private changeDetectorRef: ChangeDetectorRef
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

            this.order.orderDetails.forEach((detail:any) => {
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
    const { orderId, articleId, newQuantity, defaultQuantity, surplusQuantity } = element;
    const QuantityToAdd = newQuantity - defaultQuantity;
    this.orderDetailsService.updateOrderDetails(orderId, articleId, QuantityToAdd).subscribe(
      (response) => {
        element.surplusQuantity = QuantityToAdd;
        element.editing = false;
      },
      (error) => {
        console.error('Error saving quantity:', error);
      }
    );
  }

  isUserAdmin(): boolean {
    const user = this.authService.getUser();
    return user?.role === 'admin';
  }

  changeStatusToDone(): void {
    this.orderDetailsService.updateOrderStatus(this.order).subscribe(
      (response) => {
        this.orderState = 'done'; // Mettez à jour la variable locale
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error updating order status:', error);
      }
    );
  }


}