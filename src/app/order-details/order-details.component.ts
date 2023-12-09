import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {

  ngOnInit(): void {
    
  }

  displayedColumns: string[] = ['name', 'quantity', 'actions'];

  order = {
    "id": 1,
    "number": "123456",
    "client": {
      "id": 1,
      "name": "John Doe",
      "address": "Rua dos Bobos, nº 0",
    },
    "state": "pending",
    "delivery": {
      "id": 1,
      "user": {
        "firstname": "John",
      },
      "state": "pending",
      "title": "Delivery title",
    },
    "orderDetail": [
      {
        "label": "Product 1",
        "quantity": 1,
      },
      {
        "label": "Product 2",
        "quantity": 2,
      },
      {
        "label": "Product 3",
        "quantity": 3,
      }
    ]
  };

  public edit(element : any) {
    console.log('test');
  }

  public delete(element : any) {
    console.log('test');
  }
}
