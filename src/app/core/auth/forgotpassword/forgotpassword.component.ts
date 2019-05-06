import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.forgotPasswordFormInitialisation();
  }

  private forgotPasswordFormInitialisation(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [
        Validators.pattern(`^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+
        (\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$`),
        Validators.required
      ])
    });
  }

  // ? Passing the email address to auth service.
  public forgotPassword(): void {
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe(response => {
      if (response.status === 200) {
        this.snackBarService.openSnackBar(
          'Mail has been sent to your email Id please reset your password',
          'green-snackbar'
        );
        this.router.navigate(['/']);
      }
    });
  }

  // ? Resseting the forgot password form.
  public reset(): void {
    this.forgotPasswordForm.reset();
  }
}
