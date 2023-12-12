import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliviriesformComponent } from './deliviriesform.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [DeliviriesformComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  exports: [DeliviriesformComponent]
})
export class DeliviriesformModule { }
