import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { User } from '../../shared/models/user.model';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public contactUsForm: FormGroup;
  public user: User;
  public token: string;
  public finalChoice: string;
  public userChoice = '';
  public nullValue = '';

  constructor(
    private contactService: ContactService,
    private userService: UserService,
    private snackBarService: SnackbarService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn();
    window.scrollTo(0, 0);
    this.token = localStorage.getItem('token');
    if (this.token !== null) {
      let user = [];
      this.userService.userDetails(this.token).subscribe(response => {
        if (response.hasOwnProperty('data')) {
          user = [...response[`data`]];
        }
        this.user = user[0];
      });
    }

    // ? Validators for contact form.
    this.contactUsFormInitialisation();
  }

  private contactUsFormInitialisation(): void {
    this.contactUsForm = new FormGroup({
      userName: new FormControl('', [Validators.pattern('[(a-zA-Z)+]{1,15}')]),
      email: new FormControl('', [Validators.pattern(`^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@`
        + `[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$`)]),
      choice: new FormControl(''),
      query: new FormControl(''),
      feedBack: new FormControl('')
    });
    window.scrollTo(0, 0);
  }

  public isLoggedIn(): boolean {
    if (this.user) {
      return true;
    }
  }

  public dropdown(): void {
    this.finalChoice = this.userChoice;
    if (this.contactUsForm.value.choice !== null) {
      this.contactUsForm.controls[`feedBack`].setValue(this.nullValue);
      this.contactUsForm.controls[`query`].setValue(this.nullValue);
    }
  }

  public isQuery(): boolean {
    if (this.finalChoice === 'query') {
      return true;
    }
  }

  // ? Resetting the contact form.
  public reset(): void {
    if (this.user) {
      this.contactUsForm.controls[`query`].setValue(this.nullValue);
      this.contactUsForm.controls[`feedBack`].setValue(this.nullValue);
      this.contactUsForm.controls[`choice`].setValue(this.nullValue);
    } else {
      this.contactUsForm.reset();
    }
  }

  // ? Restricting user to enter only alphabets.
  public validate(event): boolean {
    return (event.charCode === 65 || event.charCode === 123) ? null : event.charCode >= 65 && event.charCode <= 90 ||
      event.charCode >= 97 && event.charCode <= 122;
  }

  public isFeedback(): boolean {
    if (this.finalChoice === 'rating') {
      return true;
    }
  }

  // ? Resticting user to only enter numbers.
  public validateRating(event): boolean {
    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  // ? Posting the user feedback.
  sendFeedback(): void {


    if (this.user) {
      if (this.contactUsForm.value.userName === '' && this.contactUsForm.value.email === '') {
        this.contactUsForm.value.userName = this.user.firstName;
        this.contactUsForm.value.email = this.user.email;
      }
    }
    if (
      this.contactUsForm.value.query === '' &&
      this.contactUsForm.value.feedBack === ''
    ) {
      this.snackBarService.openSnackBar(
        'Please fill all the fields',
        'red-snackbar'
      );
      return;

    }
    if (this.contactUsForm.invalid) {
      this.snackBarService.openSnackBar(
        'Please fill all the fields',
        'red-snackbar'
      );
      return;
    }

    if (this.contactUsForm.value.firstname === null || this.contactUsForm.value.email === null) {

      this.snackBarService.openSnackBar(
        'Please fill all the fields',
        'red-snackbar'
      );
      return;
    }

    this.contactService.sendFeedback(this.contactUsForm.value).subscribe(response => {
      if (response) {
        this.snackBarService.openSnackBar(
          'Feedback Sent Successfully',
          'green-snackbar'
        );
      }
    });
    this.router.navigate(['/']);
    this.contactUsForm.reset();

  }
}
