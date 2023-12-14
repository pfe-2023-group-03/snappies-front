import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { OrderDetailsComponent } from './order-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { OrderConfirmationDialogModule } from '../order-confirmation-dialog/order-confirmation-dialog.module';



@NgModule({
  declarations: [OrderDetailsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    OrderConfirmationDialogModule
  ],
  exports: [OrderDetailsComponent]
})
export class OrderDetailsModule { }
