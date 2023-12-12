import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [ClientsComponent]
})
export class ClientsModule { }
