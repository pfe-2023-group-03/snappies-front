import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToursComponent } from './tours.component';

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [ToursComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule,
    MatTableModule,

  ],
  exports: [ToursComponent]
})
export class ToursModule { }
