import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { authInformation } from '../../mocks/auth-information.mock';
import { ResetPassword } from '../../../shared/models/reset-password';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup;
  public authInformation = authInformation ;
  public hide = true;
  public type = 'password';
  public tokenFetchedFromParams: string;


  constructor(
    private authService: AuthService,
    private snackBarService: SnackbarService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.resetPasswordFormInitialisation();
  }

  private resetPasswordFormInitialisation(): void {

    // ! getting the token which is coming from the url
    this.tokenFetchedFromParams = this.route.snapshot.params.token;

    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.pattern(`^(?=.*[A-Z])(?=.*[!@#$&*\^%\*\.])(?=.*[0-9])(?=.*[a-z]).{8,32}$`),
        Validators.required
      ]),
      confirmPassword: new FormControl('', [
        Validators.pattern(`^(?=.*[A-Z])(?=.*[!@#$&*\^%\*\.])(?=.*[0-9])(?=.*[a-z]).{8,32}$`),
        Validators.required
      ])
    });
  }

  // ? Sending the reset form data to auth service.
  public resetPassword(): void {
    if (this.resetPasswordForm.value.password !== this.resetPasswordForm.value.confirmPassword) {
      this.snackBarService.openSnackBar(
        'Passwords Mismatch', 'red-snackbar'
      );
    }

    const body: ResetPassword = {
      token: this.tokenFetchedFromParams,
      password: this.resetPasswordForm.value.password,
      confirmPassword: this.resetPasswordForm.value.confirmPassword
    };

    this.authService.resetPassword(body).subscribe(response => {
      if (response.status === 200) {
        this.snackBarService.openSnackBar(
          'Your password has been changed successfully', 'green-snackbar'
        );
        this.router.navigate(['/']);
      }
    });
  }

  // ? Toggling the password visibility
  public visibility(): void {
    this.hide = !this.hide;
    if (this.hide) {
      this.type = 'password';
    } else {
      this.type = 'text';
    }
  }
}
