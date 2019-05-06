import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription, Subject } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';
import { AuthService } from '../auth.service';
import { authInformation } from '../../mocks/auth-information.mock';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  public signUpForm: FormGroup;
  public signInForm: FormGroup;
  public typeSignUpIcon = 'password';
  public typeSignInIcon = 'password';
  public hideSignUpIcon = true;
  public hideSignInIcon = true;
  public displayLogin = false;
  public displayRegister = true;
  public isAuthenticated = false;
  public buttonSpinner = false;
  public token: string;
  public userid: string;
  public username: string;
  public authInformation = authInformation;
  public googleImage = 'assets/third-party/google.png';
  public subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackbarService,
    private dialog: MatDialog,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.signUpFormInitailisation();
    this.signInFormInitialisation();
    this.authService.notifyError.subscribe((res) => {
      if (res) {
        this.buttonSpinner = false;
      }
    });
  }

  private signInFormInitialisation() {
    // ? Applying regex expression for sign in validation.
    this.signInForm = new FormGroup({
      email: new FormControl('', [
        Validators.pattern(`^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$`),
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.pattern(`^(?=.*[A-Z])(?=.*[!@#$&*\^%\*\.])(?=.*[0-9])(?=.*[a-z]).{8,32}$`),
        Validators.required
      ])
    });
  }

  private signUpFormInitailisation() {

    // ? Applying regex expression for sign up validations.

    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.pattern('[(a-zA-Z)+]{1,15}'),
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.pattern('[(a-zA-Z)+]{1,15}'),
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.pattern(`^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$`),
        Validators.required
      ]),
      mobileNumber: new FormControl(null, [
        Validators.pattern('[0-9]{10}'),
        Validators.required
      ]),
      location: new FormControl('', [
        Validators.pattern('[(a-zA-Z)+]{3,15}'),
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.pattern(`^(?=.*[A-Z])(?=.*[!@#$&*\^%\*\.])(?=.*[0-9])(?=.*[a-z]).{8,32}$`),
        Validators.required
      ]),
      confirmPassword: new FormControl('', [
        Validators.pattern(`^(?=.*[A-Z])(?=.*[!@#$&*\^%\*\.])(?=.*[0-9])(?=.*[a-z]).{8,32}$`),
        Validators.required
      ]),
      captchaForSignUp: new FormControl(null, Validators.required)
    });
  }

  // ? Validating password and confirm password are same or not.
  public submit(): void {
    if (this.signUpForm.invalid) {
      return;
    }
    if (
      this.signUpForm.value.password === this.signUpForm.value.confirmPassword
    ) {
      this.authService.signUp(this.signUpForm.value).subscribe(response => {
        if (response.data) {
          this.dialog.closeAll();
          this.routerNavigate('/');
          this.snackBarService.openSnackBar(
            'Registered Successfully',
            'green-snackbar'
          );
        }
      });
    } else {
      this.snackBarService.openSnackBar('Passwords Mismatch', 'red-snackbar');
      this.buttonSpinner = false;
    }
  }

  // ? Navigating to forgot password component.
  public forgotPassword(): void {
    this.dialog.closeAll();
    this.routerNavigate('/forgotpassword');
  }

  // ? Restricting user to enter only the numbers.
  public validateNumber(event): boolean {
    return event.charCode === 8 || event.charCode === 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }
  public onDisplayRegister(): void {
    this.displayRegister = false;
    this.displayLogin = true;
  }
  public onDisplayLogin(): void {
    this.displayRegister = true;
    this.displayLogin = false;
  }
  public activateSpinner(): void {
    this.buttonSpinner = true;
  }
  // ? Sending the sign in data to auth service.
  public signInValidation(): void {
    if (this.signInForm.invalid) {
      return;
    }
    this.authService.signIn(this.signInForm.value).subscribe(response => {
      const token = response.data;
      if (response.hasOwnProperty('userid')) {
        this.userid = response[`userid`];
      }
      this.token = token;
      if (token) {
        this.authService.listenToAuthentication(token, this.userid);
        this.snackBarService.openSnackBar(
          'Welcome To Sell Mobiles',
          'green-snackbar'
        );
        this.dialog.closeAll();
        this.socketService.login(this.userid).subscribe();
        this.routerNavigate('/');
      }
    });
  }

  // ? Restricting user to enter only alphabets.
  public validateText(event): boolean {
    return event.charCode === 65 || event.charCode === 123
      ? null
      : (event.charCode >= 65 && event.charCode <= 90) ||
      (event.charCode >= 97 && event.charCode <= 122);
  }

  public googleLogin(): void {
    const subscriptions = this.authService.googleLogin();
    this.subscription.add(subscriptions);
    this.socketService.logout(this.userid).subscribe();
  }

  public githubLogin(): void {
    const subscriptions = this.authService.githubLogin().subscribe();
    this.subscription.add(subscriptions);
    this.socketService.logout(this.userid).subscribe();
  }

  // ? Resetting the sign up form.
  public resetSignUp(): void {
    this.signUpForm.reset();
  }

  // ? Resetting the sign in form.
  public resetSignIn(): void {
    this.signInForm.reset();
  }

  // ? Toggling the password visibility in signin form
  public visibilitySignInIcon(): void {
    this.hideSignInIcon = !this.hideSignInIcon;
    if (this.hideSignInIcon) {
      this.typeSignInIcon = 'password';
    } else {
      this.typeSignInIcon = 'text';
    }
  }

  // ? Toggling the password visibility in signup form
  public visibilitySignUpIcon(): void {
    this.hideSignUpIcon = !this.hideSignUpIcon;
    if (this.hideSignUpIcon) {
      this.typeSignUpIcon = 'password';
    } else {
      this.typeSignUpIcon = 'text';
    }
  }
  public routerNavigate(url: string): void {
    this.router.navigate([url]);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
