import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompositionDialogComponent } from './compositiondialog.component';

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon'
import { MatIcon } from '@angular/material/icon';


@NgModule({
  declarations: [CompositionDialogComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatIcon,
  ],
    providers: [
        
    ],
  exports: [CompositionDialogComponent]
})
export class ordersDeliveryModule { }
