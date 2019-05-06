import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UserService } from '../../../core/services/user.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile-delete-confirmation',
  templateUrl: './profile-delete-confirmation.component.html',
  styleUrls: ['./profile-delete-confirmation.component.scss']
})
export class ProfileDeleteConfirmationComponent implements OnInit {

  public user: User;
  public userName: string;
  constructor(
    private userService: UserService,
    private snackBarService: SnackbarService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    let user = [];
    this.userName = localStorage.getItem('token');
    this.userService.userDetails(this.userName).subscribe(response => {
      if (response.hasOwnProperty('data')) {
        user = [...response[`data`]];
      }
      this.user = user[0];
    });
  }

  public deleteProfile(): void {
    this.userService.deleteUserDetails(this.user.userName).subscribe(response => {
      if (response) {
        this.userService.logOutUser();
        this.dialog.closeAll();
        this.snackBarService.openSnackBar('User Profile Deleted', 'green-snackbar');
        this.router.navigate(['/']);
      }
    });
  }
}
