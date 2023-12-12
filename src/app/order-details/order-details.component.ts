import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  private readonly API_URL = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private orderDetailsService: OrderDetailsService,
    private navigationService: NavigationService,
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
        console.log('Article:', article);
        this.articleNameMap.set(articleId, article.label);
      },
      (error) => {
        console.error(error);
      }
    );
  }


}