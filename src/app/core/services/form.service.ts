import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  // ? Creates a message Form with validators
  public createMessageForm(): FormGroup {
    return new FormBuilder().group({
      message: [
        '',
        Validators.compose(
          [
            Validators.required
          ],
        ),
      ]
    });
  }
}
