import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from 'src/app/app.component';
import { FormRegisterIncomeComponent } from './form-register/form-register-income.component';
import { IncomeComponent } from './income.component';
import { IncomeGridComponent } from './income-grid/income-grid.component';
import { IncomeInfoComponent } from './income-info/income-info.component';
import { IncomeService } from './income.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormCategoryComponent } from './form-category/form-category-income.component';


@NgModule({
  imports: [
    // Angular
    CommonModule,
    // App
    ReactiveFormsModule,
    NgxDatatableModule,
    SharedModule
  ],
  declarations: [
    // App
    IncomeComponent,
    IncomeGridComponent,
    FormRegisterIncomeComponent,
    FormCategoryComponent,
    IncomeInfoComponent
  ],
  providers: [
    // App
    IncomeService
  ],
  bootstrap: [AppComponent]
})
export class IncomeModule { }
