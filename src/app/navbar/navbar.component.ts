import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService } from '../authentication.service';
import { NavigationService } from '../services/navigation.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private location: Location, private navigationService: NavigationService, private authService : AuthenticationService) {}

  ngOnInit(): void {}

  navigateTo(route: string): void {
    this.navigationService.navigateTo(route);
    this.closeSidenav();
  }

  goBack(): void {
    this.location.back();
  }

  logout(): void {
    this.authService.signOut();
    this.navigateTo('login');
  }

  isUserAdmin(): boolean {
    const user = this.authService.getUser();
    return user?.role === 'admin';
  }

  isUSerAuthorized(): boolean {
    const user = this.authService.getUser();
    return user?.role === 'admin' || user?.role === 'deliverer';
  }

  isConnect(): boolean {
    return !this.authService.isLogged();
  }

  isDisconnect(): boolean {
    return this.authService.isLogged();
  }
  
  closeSidenav(): void {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }
}
