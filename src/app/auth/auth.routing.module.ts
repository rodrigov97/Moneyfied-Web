import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormResetPasswordComponent } from './form-reset-password/form-reset-password.component';
import { FormRegistrationComponent } from './form-registration/form-registration.component';

const ROUTES: Routes = [{
  path: '',
  component: AuthComponent,
  children: [{
    path: '',
    component: FormLoginComponent
  }, {
    path: 'forget-password',
    component: FormResetPasswordComponent
  }, {
    path: 'registration',
    component: FormRegistrationComponent
  }, {
    path: 'email-confirmation',
    component: EmailConfirmationComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
