import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [UserDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [UserDialogComponent]
})
export class UserDialogModule { }
