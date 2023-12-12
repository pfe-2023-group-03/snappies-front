import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { client } from './clientDeliveriesOrder.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-deliviriesform',
  templateUrl: './deliviriesform.component.html',
  styleUrls: ['./deliviriesform.component.css']
})
export class DeliviriesformComponent implements OnInit {

    deliveriesForm!: FormGroup;

    constructor(private clientService : client) { }

    ngOnInit(): void {
       this.deliveriesForm = new FormGroup({
        title: new FormControl('', Validators.required),
        num: new FormControl('', [Validators.required, Validators.minLength(8)]),
        clientlist: new FormControl([], Validators.required),
      });
      this.loadClients();
    }
    clientlist: any;
  
    

    loadClients() {
      forkJoin([
        this.clientService.getClient() // Appel à la méthode getClients du service clientService
        // Ajoute d'autres appels asynchrones ici s'il y en a d'autres à exécuter en parallèle
      ]).subscribe(
        (clients: any) => {
          // clients contiendra le résultat du premier appel, ici la liste des clients
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

    submit(): void {
      if (this.deliveriesForm.valid) {
        const deliveriesData = {
          title: this.deliveriesForm.value.title,
          num: this.deliveriesForm.value.num,
          state: 'Default'
        };
        this.clientService.postDeliveries(deliveriesData);
        console.log("deliveries well registered");
        const listClientChoosen = this.deliveriesForm.value.clientlist;
        if(listClientChoosen){
          for (let i = 0; i < listClientChoosen.length; i++) {
            const orderData = {
              clientId: listClientChoosen[i],
              deliveryId: this.deliveriesForm.value.num,
              state: 'Delivery'
            };
            this.clientService.postorder(orderData);
            console.log("order association well registered");
          }
        }
      }
    }

    
}
