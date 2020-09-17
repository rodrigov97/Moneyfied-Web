import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-reset-password',
  templateUrl: './form-reset-password.component.html',
  styleUrls: ['./form-reset-password.component.scss']
})
export class FormResetPasswordComponent implements OnInit {

  formResetPassword: FormGroup;

  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private route: Router
  ) {
    this.formResetPassword = new FormGroup({
      Email: new FormControl('', [
        Validators.required
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

  }
}
