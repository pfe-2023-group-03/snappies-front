import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    // Add initialization logic here
  }
  navigateTo(route: string): void {
    this.navigationService.navigateTo(route);
  }
}
