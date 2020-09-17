import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DataService } from 'src/app/shared/data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormAuthComponent implements OnInit {

  formLogin: FormGroup;

  isPasswordHidden: boolean;
  isLoading: boolean = false;

  passwordInput: string = 'password';

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private route: Router
  ) {
    this.formLogin = new FormGroup({
      Email: new FormControl('', [
        Validators.required
      ]),
      Senha: new FormControl('', [
        Validators.required
      ]),
    });
  }

  get email(): any {
    return this.formLogin.get('Email');
  }

  get password(): any {
    return this.formLogin.get('Senha');
  }

  ngOnInit(): void {

  }

  showPasswordEvent() {
    this.isPasswordHidden = !this.isPasswordHidden;

    this.passwordInput = this.isPasswordHidden ? 'text' : 'password';
  }

  login(): void {
    this.formLogin.markAllAsTouched();

    var isValid = this.formLogin.valid;

    if (isValid) {
      var value = {
        Email: this.email.value,
        Senha: this.password.value
      }

      this.isLoading = true;

      this.authService.login(value).subscribe(
        (response) => {
          if (response.success) {
            this.isLoading = false;

            localStorage.setItem('token', response.token);
            localStorage.setItem('usuario', JSON.stringify(response.usuario));

            alert(JSON.stringify(response.usuario));
            //this.route.navigate(['home']);
          }
          else {
            this.dataService.openWarningDialogModal({
              command: 'open',
              title: 'Atenção',
              content: response.message
            });

            this.isLoading = false;
          }
        }
      );
    }
  }

  forgetPassword(): void {
    this.cleanForm();

    this.route.navigate([this.route.url, 'forget-password']);
  }

  register(): void {
    this.cleanForm();

    this.route.navigate([this.route.url, 'registration']);
  }

  cleanForm(): void {
    this.formLogin.setValue({
      Email: null,
      Senha: null
    });
  }
}
