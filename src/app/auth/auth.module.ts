import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth.routing.module';
import { AuthComponent } from './auth.component';
import { CoreModule } from '../core/core.module';
import { FormAuthComponent } from './form-login/form-login.component';
import { FormResetPasswordComponent } from './form-reset-password/form-reset-password.component';
import { FormRegistrationComponent } from './form-registration/form-registration.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // App
    AuthRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    CoreModule,
    SharedModule
  ],
  declarations: [
    AuthComponent,
    FormAuthComponent,
    FormResetPasswordComponent,
    FormRegistrationComponent,
    ContentComponent
  ],
  bootstrap: [AppComponent]
})
export class AuthModule { }
