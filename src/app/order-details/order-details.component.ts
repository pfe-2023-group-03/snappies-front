import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  order: any;

  constructor(private route: ActivatedRoute, private http : HttpClient, private authService : AuthenticationService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.order = this.http.get('http://localhost:3000/orders/' + id, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken(),
      },
    });

    const client = this.http.get('http://localhost:3000/clients/' + this.order.clientId, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken(),
      },
    });

    const delivery = this.http.get('http://localhost:3000/deliveries/' + this.order.deliveryId, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken(),
      },
    });

    this.order.client = client;
    this.order.delivery = delivery;
  }

  displayedColumns: string[] = ['name', 'quantity', 'actions'];

  public edit(element : any) {
    console.log('test');
  }

  public delete(element : any) {
    console.log('test');
  }
}
