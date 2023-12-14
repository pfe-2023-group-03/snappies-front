import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-confirmation-dialog',
  templateUrl: './order-confirmation-dialog.component.html',
})
export class OrderConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<OrderConfirmationDialogComponent>) {}
}
