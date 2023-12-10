import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToursComponent } from './tours.component';

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon'



@NgModule({
  declarations: [ToursComponent],
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
  exports: [ToursComponent]
})
export class ToursModule { }
