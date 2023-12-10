import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { NavigationService } from '../services/navigation.service';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule
  ],
  providers: [NavigationService],
  exports: [AdminComponent]
})
export class AdminModule { }
