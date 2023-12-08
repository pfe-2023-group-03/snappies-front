import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ToursComponent } from './tours/tours.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'tours', component: ToursComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
