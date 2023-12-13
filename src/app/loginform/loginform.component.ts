import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit{
  errorMessage: string = '';

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
    private dialog : MatDialog) {}

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
          if (error.status === 401) {
            this.errorMessage = 'Accès non autorisé. Veuillez vérifier vos identifiants.';
          } else if (error.status === 404) {
            this.errorMessage = 'Ressource non trouvée. Veuillez réessayer ultérieurement.';
          } else {
            this.errorMessage = 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer.';
          }
          this.openDialog();
        }
      );
    }    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: { errorMessage: this.errorMessage }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Boîte de dialogue fermée');
    });
  }
}
