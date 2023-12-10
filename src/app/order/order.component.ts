import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      clientName: new FormControl('', Validators.required),
      deliveryNumber: new FormControl('', Validators.required),
      article: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      // TODO: Implement logic to handle form submission, e.g., send data to a server
      console.log('Form submitted:', this.orderForm.value);
    }
  }
}
