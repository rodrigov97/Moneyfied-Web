import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from '../app.component';
import { ErrorComponent } from './dialogs/error/error.component';
import { SuccessComponent } from './dialogs/success/success.component';
import { WarningComponent } from './dialogs/warning/warning.component';
import { LoadSpinnerComponent } from './ui/load-spinner/load-spinner.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    // App
    ErrorComponent,
    SuccessComponent,
    WarningComponent,
    LoadSpinnerComponent,
    TextInputComponent
  ],
  exports: [
    // App
    ErrorComponent,
    SuccessComponent,
    WarningComponent,
    LoadSpinnerComponent,
    TextInputComponent
  ],
  bootstrap: [AppComponent]
})
export class SharedModule { }
