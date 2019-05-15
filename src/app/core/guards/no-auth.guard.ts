import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot,
  RouterStateSnapshot, Router, ActivatedRoute,
  NavigationStart, NavigationEnd
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SnackbarService } from '../services/snackbar.service';

// !appplying no gaurd on public routes(rotues that are avaliable for all users)
@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  previousUrl: string;
  constructor(
    private router: Router,
    private snackBar: SnackbarService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((navigationEnd: NavigationEnd) => {
        if (navigationEnd.url === '/admin/login' && localStorage.getItem('isLoggedin')) {
          this.snackBar.openSnackBar('You cant perform this operation', 'red-snackbar');
          this.router.navigate(['/admin/dashboard']);
        } else if (navigationEnd.url === '/admin/login') {
          this.router.navigate(['/admin/login']);
        } else if (navigationEnd.url === '/admin/dashboard') {
          this.router.navigate(['/admin/dashboard']);
        } else if (navigationEnd.url === '/admin/charts') {
          this.router.navigate(['/admin/charts']);
        } else if (navigationEnd.url === '/admin/registered-users') {
          this.router.navigate(['/admin/registered-users']);
        }
      });

    return true;
  }
}
