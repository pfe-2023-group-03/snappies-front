import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { OrderConfirmationDialogComponent } from './order-confirmation-dialog.component';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [OrderConfirmationDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    FormsModule
  ],
  exports: [OrderConfirmationDialogComponent]
})
export class OrderConfirmationDialogModule { }
