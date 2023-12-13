import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveriesformComponent } from './deliveriesform.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NavigationService } from '../services/navigation.service';

@NgModule({
  declarations: [DeliveriesformComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers :[NavigationService],
  exports: [DeliveriesformComponent],
})
export class DeliveriesformModule {}
