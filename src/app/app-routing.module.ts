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


const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginformComponent},
  { path: 'deliveries', component: DeliveriesComponent, canActivate: [AuthenticationGuard, AuthorizationGuard], data: { roles: [Role.Admin, Role.Deliverer] } },
  { path: 'admin', component: AdminComponent, canActivate: [AuthenticationGuard, AuthorizationGuard], data: { roles: [Role.Admin] } },
  { path: 'order', component: OrderComponent},
  { path: 'orders/:id', component: OrderDetailsComponent}
  { path: 'create-user', component: UserformComponent, canActivate: [AuthenticationGuard, AuthorizationGuard], data: { roles: [Role.Admin] }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
