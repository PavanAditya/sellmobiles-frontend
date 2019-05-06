import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ErrorHandlerComponent } from '../../shared/components/error-handler/error-handler.component';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {
  constructor(
    public dialog: MatDialog,
    private authService: AuthService) { }

  // ? Intercepting Response which has been recieved from Server to Client
  intercept(req: HttpRequest<Response>, next: HttpHandler): Observable<HttpEvent<Response>> {


    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error !';
        if (error.error.message.message) {
          errorMessage = error.error.message.message;
        } else if (error.error.message) {
          errorMessage = error.error.message;
        } else {
          errorMessage = 'Something went wrong !!';
        }
        this.authService.notifyError.next(true);
        this.dialog.open(ErrorHandlerComponent, { data: { message: errorMessage } });
        return throwError(error);
      })
    );
  }
}
