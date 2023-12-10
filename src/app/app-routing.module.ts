import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginformComponent } from './loginform/loginform.component';
import { AdminComponent } from './admin/admin.component';

import { ordersDeliveryComponent } from './ordersDelivery/ordersDelivery.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginformComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'delivery', component: ordersDeliveryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
