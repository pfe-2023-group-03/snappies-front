import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginformComponent } from './loginform.component';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AuthenticationService } from '../authentication.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginformComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthenticationService
  ],
  exports: [LoginformComponent]
})
export class LoginformModule { }
