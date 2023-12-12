import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'role', 'action'];

  constructor(private userService: UserService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  openConfirmationDialog(user: any): void {
    const dialogRef = this.dialog.open(UserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.callBackendMethod(user);
      }
    });
  }

  callBackendMethod(user: any): void {
    this.userService.updateUserRole(user.id, 'admin').subscribe(
      (response: any) => {
      console.log('Backend response:', response);

      if (response && response.affected && response.affected > 0) {
        console.log('User role updated successfully.');
      } else {
        console.error('Failed to update user role.');
      }
    },
    (error) => {
      console.error('Error updating user role:', error);
    })
  }
}
