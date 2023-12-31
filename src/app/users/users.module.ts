// users.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserDialogModule } from '../user-dialog/user-dialog.module';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    UserDialogModule
  ],
  exports: [UsersComponent], // Optionally, if you want to use it in other modules
})
export class UsersModule { }
