import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginformComponent } from './loginform/loginform.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AdminComponent } from './admin/admin.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { UserformComponent } from './userform/userform.component';
import { AuthenticationGuard } from './authentication.guard';
import { OrderComponent } from './order/order.component';
import { AuthorizationGuard } from './authorization.guard';
import { Role } from './models/role';
import { ClientformComponent } from './clientform/clientform.component';
import { DeliviriesformComponent } from './deliviriesform/deliviriesform.component';

import { ordersDeliveryComponent } from './ordersDelivery/ordersDelivery.component';
import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthenticationGuard, AuthorizationGuard], data: { roles: [Role.Admin] } },
  { path: 'login', component: LoginformComponent},
  { path: '', component: DeliveriesComponent, canActivate: [AuthenticationGuard, AuthorizationGuard], data: { roles: [Role.Admin, Role.Deliverer] } },
  { path: 'admin', component: AdminComponent, canActivate: [AuthenticationGuard, AuthorizationGuard], data: { roles: [Role.Admin] } },
  { path: 'order', component: OrderComponent},
  { path: 'orders/:id', component: OrderDetailsComponent},
  { path: 'create-user', component: UserformComponent, canActivate: [AuthenticationGuard, AuthorizationGuard], data: { roles: [Role.Admin] }},
  { path: 'delivery/:deliveryId', component: ordersDeliveryComponent},
  { path: 'create-client', component: ClientformComponent, canActivate: [AuthenticationGuard, AuthorizationGuard], data: { roles: [Role.Admin] }},
  { path: 'deliveriesForm', component: DeliviriesformComponent, canActivate: [AuthenticationGuard, AuthorizationGuard], data: { roles: [Role.Admin] }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
