import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ordersDeliveryComponent } from './ordersDelivery.component';
import { NavigationService } from '../services/navigation.service';
import { AuthenticationService } from '../authentication.service';

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon'


@NgModule({
  declarations: [ordersDeliveryComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
  ],
  providers: [
    NavigationService,
    AuthenticationService,
  ],
  exports: [ordersDeliveryComponent]
})
export class ordersDeliveryModule { }
