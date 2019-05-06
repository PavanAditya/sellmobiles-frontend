import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../core/services/user.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { AuthService } from '../../core/auth/auth.service';
import {
  ProfileDeleteConfirmationComponent
} from '../../shared/components/profile-delete-confirmation/profile-delete-confirmation.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: User;
  public userName: string;
  public editToggle = false;
  public userForm: FormGroup;
  public isAuthenticated = false;
  public updateDisabled = false;

  constructor(
    private userService: UserService,
    private snackBarService: SnackbarService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // ? Adding validators for profile.
    window.scrollTo(0, 0);
    this.authService.isLoggedIn();
    this.userProfileFormInitialisation();
    this.userName = localStorage.getItem('token');
    let user = [];
    this.userService.userDetails(this.userName).subscribe(response => {
      if (response.hasOwnProperty('data')) {
        user = response[`data`];
      }
      this.user = user[0];
    });
  }

  private userProfileFormInitialisation() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.pattern('[A-Za-z]+')),
      lastName: new FormControl('', Validators.pattern('[A-Za-z]+')),
      mobileNumber: new FormControl('', Validators.pattern('[0-9]{10}')),
      location: new FormControl('', Validators.pattern('[A-Za-z]+')),
      email: new FormControl('')
    });
  }

  // ? Function for updating the profile.
  public updateProfile() {
    this.userForm.value.firstName === ''
      ? (this.user.firstName = this.user.firstName)
      : (this.user.firstName = this.userForm.value.firstName);
    this.userForm.value.lastName === ''
      ? (this.user.lastName = this.user.lastName)
      : (this.user.lastName = this.userForm.value.lastName);
    this.userForm.value.mobileNumber === ''
      ? (this.user.mobileNumber = this.user.mobileNumber)
      : (this.user.mobileNumber = this.userForm.value.mobileNumber);
    this.userForm.value.location === ''
      ? (this.user.location = this.user.location)
      : (this.user.location = this.userForm.value.location);
    this.user.token = this.userName;
    this.userService.updateUserDetails(this.user).subscribe(response => {
      if (response.hasOwnProperty('data')) {
        this.user = response[`data`];
      }
    });
    this.editToggle = !this.editToggle;
    this.snackBarService.openSnackBar('User Profile Updated', 'green-snackbar');
  }

  // ? Restricting user to only enter the numbers.
  public validate(event): boolean {
    return event.charCode === 8 || event.charCode === 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }

  public cancelEdit(): void {
    this.userForm.reset();
    this.editToggle = !this.editToggle;
  }

  public editProfile(): void {
    this.editToggle = !this.editToggle;
  }

  // ? Function for deleting the profile.
  public deleteProfile() {
    this.dialog.open(ProfileDeleteConfirmationComponent, {});
  }
}
