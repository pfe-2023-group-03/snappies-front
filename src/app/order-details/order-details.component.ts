import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { environment } from 'src/environments/environment';
import { OrderDetailsService } from './order-details.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  isLoading: boolean = true;

  private readonly API_URL = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private orderDetailsService: OrderDetailsService,
    private navigationService: NavigationService,
  ) {}

  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.orderDetailsService.getOrder(id).subscribe(
      (order) => {
        this.order = order;
      },
      (error) => {
        console.error(error);
      }
    );
    

    this.orderDetailsService.getClient(this.order.clientId).subscribe((client) => {
      this.order.client = client;
      this.isLoading = false;
    });

    this.orderDetailsService.getOrderDetails(this.order.id).subscribe((orderDetails) => {
      this.order.orderDetails = orderDetails;
      this.isLoading = false;
    });
  }

  diplayedColumns: string[] = ['name', 'quantity', 'actions'];

  edit(element: any) {
    console.log(element);
  }
}