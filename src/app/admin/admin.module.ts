import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { NavigationService } from '../services/navigation.service';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { AuthenticationService } from '../authentication.service';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule
  ],
  providers: [NavigationService,AuthenticationService],
  exports: [AdminComponent]
})
export class AdminModule { }
