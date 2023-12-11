import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginformComponent } from './loginform/loginform.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AdminComponent } from './admin/admin.component';
import { AuthenticationGuard } from './authentication.guard';
import { OrderComponent } from './order/order.component';
import { AuthorizationGuard } from './authorization.guard';
import { Role } from './models/role';


const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginformComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthenticationGuard, AuthorizationGuard], data: { roles: [Role.Admin] } },
  { path: 'order', component: OrderComponent},
  { path: 'orders/:id', component: OrderDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
