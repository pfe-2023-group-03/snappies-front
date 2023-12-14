import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from '../authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ClientformComponent } from './clientform.component';

@NgModule({
    declarations: [ClientformComponent],
    imports: [
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatSelectModule
    ],
    providers: [
      AuthenticationService
    ],
    exports: [ClientformComponent]
  })
  export class ClientformModule { }