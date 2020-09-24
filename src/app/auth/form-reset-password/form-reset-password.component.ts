import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/core/services/custom-validators';

@Component({
  selector: 'app-form-reset-password',
  templateUrl: './form-reset-password.component.html',
  styleUrls: ['./form-reset-password.component.scss']
})
export class FormResetPasswordComponent implements OnInit {

  formResetPassword: FormGroup;

  isLoading: boolean = false;
  emailSuccess: boolean = false;
  mailSent: boolean = false;

  userMail: string;

  constructor(
    private authService: AuthService,
    private route: Router
  ) {
    this.formResetPassword = new FormGroup({
      Email: new FormControl('', [
        Validators.required, CustomValidators.email
      ])
    });
  }

  get email(): AbstractControl {
    return this.formResetPassword.get('Email');
  }

  ngOnInit(): void {

  }

  backToLogin(): void {
    this.formResetPassword.setValue({
      Email: null
    });

    this.route.navigate(['login']);
  }

  resetPassword(): void {
    this.formResetPassword.markAllAsTouched();

    var isValid = this.formResetPassword.valid;

    if (isValid) {
      this.isLoading = true;
      this.userMail = this.email.value;

      this.authService.resetPassword(this.formResetPassword.value).subscribe(
        response => {
          this.isLoading = false;
          this.mailSent = true;
          this.formResetPassword.reset();
          if (response.success) {
            this.emailSuccess = response.success;
          }
          else {
            this.emailSuccess = response.success;
          }
        });
    }
  }
}
