import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit{
  
  ngOnInit(): void {}

  hide = true;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rememberMe: new FormControl(false)
  });

  constructor(
    private navigationService: NavigationService,
    private readonly authenticationService : AuthenticationService, 
    private router : Router) {}

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    const rememberMe = this.loginForm.get('rememberMe')?.value || false;
    
    if ((username && password) && (username != null && password != null)) {
      this.authenticationService.signin(username, password, rememberMe).subscribe(
        () => {
          this.navigationService.navigateTo('/');
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
    }    
  }
}
