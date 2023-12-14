import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any;
  displayedColumns: string[] = ['name', 'address', 'phone'];

  constructor(private readonly clientsService : ClientsService) { }

  ngOnInit() {
    this.clientsService.getClients().subscribe((data: any) => {
      this.clients = data;
    });
  }
}
