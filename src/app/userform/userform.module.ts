import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserformComponent } from './userform.component';
import { ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule pour utiliser les FormControl

@NgModule({
  declarations: [UserformComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule, // Ajoutez ReactiveFormsModule pour utiliser les FormControl
  ],
  exports: [UserformComponent]
})
export class UserformModule { }
