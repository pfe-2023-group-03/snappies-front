import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginformComponent } from './loginform/loginform.component';
import { OrderDetailsComponent } from './order-details/order-details.component';


const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginformComponent},
  { path: 'order-details', component: OrderDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
