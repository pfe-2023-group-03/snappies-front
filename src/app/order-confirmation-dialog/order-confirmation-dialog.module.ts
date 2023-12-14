import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderConfirmationDialogComponent } from './order-confirmation-dialog.component';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [OrderConfirmationDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [OrderConfirmationDialogComponent]
})
export class OrderConfirmationDialogModule { }
