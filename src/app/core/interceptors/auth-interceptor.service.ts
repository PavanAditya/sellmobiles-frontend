import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  intercept(req: HttpRequest<Response>, next: HttpHandler) {
    const authToken = this.authService.authData();
    const authRequest = req.clone({
      headers: req.headers.set('authorization', 'Bearer ' + authToken)
    });

    return next.handle(authRequest).pipe(tap(
      (event: HttpEvent<Response>) => { },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status <= 451) {
            this.authService.logOutUser();
            this.route.navigate(['/']);
          }
        }
      }
    ));
  }
}
