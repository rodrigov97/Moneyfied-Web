import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from '../app.component';
import { ErrorComponent } from './dialogs/error/error.component';
import { LoadSpinnerComponent } from './ui/load-spinner/load-spinner.component';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SuccessComponent } from './dialogs/success/success.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { WarningComponent } from './dialogs/warning/warning.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectComponent } from './components/select/select.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgbModule,
    NgxMaskModule.forChild()
  ],
  declarations: [
    // App
    ErrorComponent,
    SuccessComponent,
    WarningComponent,
    LoadSpinnerComponent,
    TextInputComponent,
    MenuComponent,
    NavbarComponent,
    SelectComponent,
    DatepickerComponent
  ],
  exports: [
    // App
    ErrorComponent,
    SuccessComponent,
    WarningComponent,
    LoadSpinnerComponent,
    TextInputComponent,
    MenuComponent,
    NavbarComponent,
    SelectComponent,
    DatepickerComponent
  ],
  bootstrap: [AppComponent]
})
export class SharedModule { }
