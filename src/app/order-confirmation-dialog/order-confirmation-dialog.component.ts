// order-confirmation-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  quantityForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<OrderConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.order = data.order;
    this.articleNameMap = data.articleNameMap;

    // Initialize form controls based on order details
    const formControls: { [key: string]: any } = {};
    this.order?.orderDetails.forEach((element: any) => {
      formControls[`quantity_${element.articleId}`] = [Number(element.quantity)]; // Convert to number
    });

    this.quantityForm = this.fb.group(formControls);
  }

  cancelConfirmation(): void {
    this.dialogRef.close(false);
  }

  confirmValidation(): void {  
    this.saveForm();
    this.dialogRef.close(true);
  }

  saveForm(): void {
    // Your save form logic here
    // For example, if you want to update the orderDetails
    this.order.orderDetails.forEach((element: any) => {
      const formControlName = `quantity_${element.articleId}`;
      const newQuantityValue = this.quantityForm.get(formControlName)?.value;
  
      // Set the newQuantity directly on the element
      element.newQuantity = newQuantityValue;
  
      // Your additional save logic here, if needed
      const { orderId, articleId, quantityToShow, newQuantity, quantity } = element;
    });
  }
  
  
  
}
