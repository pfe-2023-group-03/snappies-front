import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeliveriesformService } from './deliveriesform.service';

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

  constructor(private deliveriesformService: DeliveriesformService) { }

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
      console.log("la méthode est appelée")
      const deliveriesData = {
        title: this.deliveriesForm.value.title,
        state: 'default'
      };
      const createdDelivery = this.deliveriesformService.postDeliveries(deliveriesData);
      console.log("deliveries well registered");
      const listClientChoosen = this.deliveriesForm.value.clientlist;
      if (listClientChoosen) {
        for (let i = 0; i < listClientChoosen.length; i++) {
          const orderData = {
            clientId: listClientChoosen[i],
            deliveryId: listClientChoosen.id,
            state: 'delivery'
          };
          this.deliveriesformService.postorder(orderData);
          console.log("order association well registered");
        }
      }
    }
  }
}