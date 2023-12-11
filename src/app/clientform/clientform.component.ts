import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientformService } from './clientform.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-clientform',
  templateUrl: './clientform.component.html',
  styleUrls: ['./clientform.component.css']
})
export class ClientformComponent {

  ngOnInit(): void {}

  hide = true;

  clientform = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\+\d{11}$/)]),
  });

  constructor(private readonly clientformService : ClientformService, private readonly navigationService : NavigationService) {}

  onSubmit() {
    const name = this.clientform.get('name')?.value;
    const address = this.clientform.get('address')?.value;
    const phone = this.clientform.get('phone')?.value;

    if (this.clientform.valid) {
      if((name && address && phone) && (name != null && address != null && phone != null)) {
      this.clientformService.createClient(name, address, phone).subscribe(
        () => {
          this.navigationService.navigateTo('/admin')
        },
        (error: any) => {
          console.error('Login error:', error);
        });
      }
    }
  }
}
