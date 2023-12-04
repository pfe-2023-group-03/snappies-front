// users.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule],
  exports: [UsersComponent], // Optionally, if you want to use it in other modules
})
export class UsersModule { }
