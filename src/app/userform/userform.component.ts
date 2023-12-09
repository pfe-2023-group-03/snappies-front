import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {
  ngOnInit(): void {}
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  floatLabelControl: FormControl = new FormControl('delivery');
  // Fonction pour récupérer le message d'erreur
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  hide = true;
}
