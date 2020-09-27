import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/core/services/custom-validators';
import { ResponsiveService } from 'src/app/core/services/responsive.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  formTitle: string = 'Dados do usuário';
  formProfile: FormGroup;
  formDisabled: boolean = true;

  isMobile: boolean;

  constructor(
    private responsiveService: ResponsiveService
    ) {
    this.formProfile = new FormGroup({
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
    return this.formProfile.get('Nome');
  }

  get email(): any {
    return this.formProfile.get('Email');
  }

  get password(): any {
    return this.formProfile.get('Senha');
  }

  ngOnInit(): void {
    this.formProfile.disable();
  }

  onResize(): void {
    this.responsiveService.checkWidth();
    this.isMobile = this.responsiveService.isMobile;
  }

  formState(): void {
    if (this.formDisabled) {
      this.formProfile.enable();
      this.formTitle = 'Editar Dados do usuário';
    }
    else {
      this.formProfile.disable();
      this.formTitle = 'Dados do usuário';
    }

    this.formDisabled = !this.formDisabled;
  }
}
