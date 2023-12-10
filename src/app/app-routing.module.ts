import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginformComponent } from './loginform/loginform.component';
import { AdminComponent } from './admin/admin.component';
import { AuthenticationGuard } from './authentication.guard';
import { OrderComponent } from './order/order.component';
import { AuthorizationGuard } from './authorization.guard';
import { Role } from './models/role';

import { ordersDeliveryComponent } from './ordersDelivery/ordersDelivery.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginformComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthenticationGuard, AuthorizationGuard], data: { roles: [Role.Admin] } },
  { path: 'order', component: OrderComponent},
  { path: 'delivery/:deliveryId', component: ordersDeliveryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
