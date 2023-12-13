import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeliveriesformService } from './deliveriesform.service';


@Component({
  selector: 'app-deliveriesform',
  templateUrl: './deliveriesform.component.html',
  styleUrls: ['./deliveriesform.component.css']
})
export class DeliveriesformComponent implements OnInit {

    deliveriesForm!: FormGroup;   
    clientlist!: any[];

    constructor(private deliveriesformService : DeliveriesformService) { }

    ngOnInit(): void {
      
      this.loadClients();
      //this.loadClients();
    }
  
    
    loadClients(): void {
      this.deliveriesformService.getClient().subscribe(
          (clients: any) => {
              this.clientlist = clients;
              this.deliveriesForm = new FormGroup({
                  title: new FormControl('', Validators.required),
                  num: new FormControl('', [Validators.required, Validators.minLength(8)]),
                  clientlist: new FormControl([], Validators.required),
              });
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
          state: 'Default'
        };
         const createdDelivery = this.deliveriesformService.postDeliveries(deliveriesData);
        console.log("deliveries well registered");
        const listClientChoosen = this.deliveriesForm.value.clientlist;
        if(listClientChoosen){
          for (let i = 0; i < listClientChoosen.length; i++) {
            const orderData = {
              clientId: listClientChoosen[i],
              deliveryId: listClientChoosen.id,
              state: 'Delivery'
            };
            this.deliveriesformService.postorder(orderData);
            console.log("order association well registered");
          }
        }
      }
    }

    
}
