import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService } from '../authentication.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private location: Location, private navigationService: NavigationService, private authService : AuthenticationService) {}

  ngOnInit(): void {}

  navigateTo(route: string): void {
    this.navigationService.navigateTo(route);
  }

  goBack(): void {
    this.location.back();
  }
  logout(): void {
    this.authService.signOut();
    this.navigateTo('login');
  }
}
