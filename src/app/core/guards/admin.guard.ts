import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('isLoggedin')) {
      return true;
    }

    this.router.navigate(['/admin/login']);
    return false;
  }
}
