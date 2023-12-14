import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { UserformService } from './userform.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  ngOnInit(): void {}

  hide = true;

  roles = [
    {value: 'admin', viewValue: 'Administarateur'},
    {value: 'deliverer', viewValue: 'Livreur'},
    {value: 'user', viewValue: 'utilisateur'}
  ];

  userform = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', Validators.required),
  });

  constructor(private readonly userformService : UserformService, private readonly navigationService : NavigationService) {}

  onSubmit() {
    const firstname = this.userform.get('firstname')?.value;
    const lastname = this.userform.get('lastname')?.value;
    const email = this.userform.get('email')?.value;
    const password = this.userform.get('password')?.value;
    const role = this.userform.get('role')?.value;

    if (this.userform.valid) {
      if((firstname && lastname && email && password && role) && (firstname != null && lastname != null && email != null && password != null && role != null)) {
      this.userformService.createUser(firstname, lastname, email, password, role).subscribe(
        () => {
          this.navigationService.navigateTo('/users')
        },
        (error) => {
          console.error('Login error:', error);
        });
      }
    }
  }

}
