import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { DataService } from 'src/app/shared/data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {

  isLoading: boolean = false;

  emailSent: boolean = false;
  resentFinished: boolean = false;
  hideWarning: boolean = false;

  formConfirmation: FormGroup;

  userEmail: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: LocalStorageService,
    private dataService: DataService,
  ) {
    this.formConfirmation = new FormGroup({
      Email: new FormControl('', [Validators.required])
    })
  }

  get email(): AbstractControl {
    return this.formConfirmation.get('Email');
  }

  ngOnInit(): void {
    this.userEmail = this.storageService.userEmail;
  }

  get emailIsConfirmed(): boolean {
    return this.storageService.emailConfirmado;
  }

  resentEmail(): void {
    var email = {
      Email: this.email.value
    };

    if (this.isFormValid) {
      this.isLoading = true;

      this.authService.resentEmailConfirmation(email).subscribe(response => {

        this.resentFinished = true;
        this.emailSent = response.emailEnviado;
        this.hideWarning = true;

        if (response.success) {
          this.formConfirmation.reset();
        }

        this.isLoading = false;
      });
    }
    else {
      this.dataService.openWarningDialog({
        command: 'open',
        title: 'Atenção',
        content: 'O email deve ser igual ao cadastrado pelo usuário !'
      });
    }
  }

  get isFormValid(): boolean {
    if (this.formConfirmation.valid && this.storageService.userEmail === this.email.value) {
      return true;
    }
    else {
      return false;
    }
  }

  goToLogin(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
