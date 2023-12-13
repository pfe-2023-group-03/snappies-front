import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeliveriesformService } from './deliveriesform.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-deliveriesform',
  templateUrl: './deliveriesform.component.html',
  styleUrls: ['./deliveriesform.component.css']
})
export class DeliveriesformComponent implements OnInit {

  deliveriesForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    clientlist: new FormControl([], Validators.required),
  });

  clientlist: any[] = [];

  constructor(private deliveriesformService: DeliveriesformService, private navigationService : NavigationService) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.deliveriesformService.getClient().subscribe(
      (clients: any) => {
        this.clientlist = clients;
        this.deliveriesForm.patchValue({
          clientlist: this.clientlist
        });
      },
      (error) => {
        console.error('Erreur lors du chargement des clients : ', error);
      }
    );
  }

  onSubmit(): void {
    if (this.deliveriesForm.valid) {
      const deliveriesData = {
        title: this.deliveriesForm.value.title,
        state: 'default'
      };
      this.deliveriesformService.postDeliveries(deliveriesData).subscribe((delivery) => {
        const listClientChoosen = this.deliveriesForm.value.clientlist;
        if (listClientChoosen) {
          for (let i = 0; i < listClientChoosen.length; i++) {
            const orderData = {
              clientId: listClientChoosen[i],
              deliveryId: delivery.id,
              state: 'delivery'
            };
            this.deliveriesformService.postorder(orderData).subscribe((order) => {
            });
          }
        }
      })
    } 
    this.navigationService.navigateTo('/');
  }
}