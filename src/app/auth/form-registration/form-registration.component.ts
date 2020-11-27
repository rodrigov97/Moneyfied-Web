import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { CustomValidators } from 'src/app/core/services/custom-validators';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss']
})
export class FormRegistrationComponent implements OnInit {

  formRegister: FormGroup;

  isPasswordHidden: boolean;
  isLoading: boolean = false;

  emailSuccess: boolean = false;
  mailSent: boolean = false;

  passwordInput: string = 'password';

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private route: Router,
  ) {
    this.formRegister = new FormGroup({
      Nome: new FormControl('', [
        Validators.required
      ]),
      Email: new FormControl('', [
        Validators.required, CustomValidators.email
      ]),
      Senha: new FormControl('', [
        Validators.required, Validators.minLength(5)
      ])
    });
  }

  get name(): any {
    return this.formRegister.get('Nome');
  }

  get email(): any {
    return this.formRegister.get('Email');
  }

  get password(): any {
    return this.formRegister.get('Senha');
  }

  ngOnInit(): void {

  }

  showPasswordEvent() {
    this.isPasswordHidden = !this.isPasswordHidden;

    this.passwordInput = this.isPasswordHidden ? 'text' : 'password';
  }

  register(): void {
    this.formRegister.markAllAsTouched();

    var isValid = this.formRegister.valid;

    if (isValid) {
      var value = {
        Nome: this.name.value,
        Email: this.email.value,
        Senha: this.password.value
      }

      this.isLoading = true;

      this.authService.register(value).subscribe(
        (response) => {
          this.mailSent = response.emailEnviado;

          if (response.success) {
            this.isLoading = false;

            this.dataService.openSuccessDialog({
              command: 'open',
              title: 'Sucesso',
              content: response.message
            });

            if (response.emailEnviado)
              this.emailSuccess = true;

            this.route.navigate(['login']);
          }
          else {
            this.isLoading = false;

            this.dataService.openWarningDialog({
              command: 'open',
              title: 'Atenção',
              content: response.message
            });
          }
        }
      );
    }
  }

  backToLogin(): void {
    this.formRegister.reset();

    this.route.navigate(['login']);
  }
}
