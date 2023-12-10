import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginformComponent } from './loginform/loginform.component';
import { AdminComponent } from './admin/admin.component';

import { ToursComponent } from './tours/tours.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginformComponent},
  { path: 'admin', component: AdminComponent}
  { path: 'tours', component: ToursComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
