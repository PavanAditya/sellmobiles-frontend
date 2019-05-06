import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarService } from '../../core/services/snackbar.service';
import { environment } from '../../../environments/environment.prod';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public validEmail: string = environment.adminLogin;
  public validPassword: string = environment.adminPassword;
  public signInForm: FormGroup;

  public hideSignInIcon = true;
  public typeSignInIcon = 'password';

  constructor(
    private router: Router,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [
        Validators.pattern(
          `^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$`
        ),
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.pattern(
          `^(?=.*[A-Z])(?=.*[!@#$&*\^%\*\.])(?=.*[0-9])(?=.*[a-z]).{8,32}$`
        ),
        Validators.required
      ])
    });
  }

  public visibilitySignInIcon(): void {
    this.hideSignInIcon = !this.hideSignInIcon;
    if (this.hideSignInIcon) {
      this.typeSignInIcon = 'password';
    } else {
      this.typeSignInIcon = 'text';
    }
  }

  public signInValidation(): void {
    if (this.signInForm.value.email === this.validEmail && this.signInForm.value.password === this.validPassword) {
      localStorage.setItem('isLoggedin', 'true');
      this.router.navigate(['/admin/dashboard']);
      this.snackBarService.openSnackBar(
        'Logged In Successfully',
        'green-snackbar'
      );
    } else {
      this.snackBarService.openSnackBar('Invalid Credentials', 'red-snackbar');
    }
  }
}
