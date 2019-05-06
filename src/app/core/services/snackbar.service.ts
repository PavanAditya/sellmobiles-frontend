import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar(message: string, className: string): void {
    this.snackBar.open(message,
      className === 'red-snackbar' ? 'Failure' : 'Success',
      {
      duration: 3000,
      panelClass: [className],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
