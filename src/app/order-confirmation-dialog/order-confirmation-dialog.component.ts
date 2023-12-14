import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-confirmation-dialog',
  templateUrl: './order-confirmation-dialog.component.html',
  styleUrls: ['./order-confirmation-dialog.component.css'],
})
export class OrderConfirmationDialogComponent {
  order: any;
  articleNameMap: Map<number, string>;
  displayedColumns: string[] = ['name', 'quantity'];

  constructor(
    public dialogRef: MatDialogRef<OrderConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.order = data.order;
    this.articleNameMap = data.articleNameMap;
  }

  cancelConfirmation(): void {
    this.dialogRef.close(false);
  }

  confirmValidation(): void {
    this.dialogRef.close(true);
  }

  saveQuantity(element: any): void {
    // Your saveQuantity logic here
  }
}
