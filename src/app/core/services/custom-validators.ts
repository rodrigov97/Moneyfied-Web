import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

  private static readonly EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor() {}

  static email(control: AbstractControl): ValidationErrors | null {
    return !control.value || CustomValidators.EMAIL_REGEX.test(control.value)
      ? null
      : { email: true };
  }
}
