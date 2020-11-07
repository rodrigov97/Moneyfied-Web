import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from 'src/app/app.component';
import { ExpenseGridComponent } from './expense-grid/expense-grid.component';
import { ExpenseInfoComponent } from './expense-info/expense-info.component';
import { ExpenseService } from './expense.service';
import { FormCategoryComponent } from './form-category/form-category-expense.component';
import { FormRegisterComponent } from './form-register/form-register-expense.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExpenseComponent } from './expense.component';


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
    ExpenseComponent,
    FormCategoryComponent,
    FormRegisterComponent,
    ExpenseGridComponent,
    ExpenseInfoComponent
  ],
  providers: [
    // App
    ExpenseService
  ],
  bootstrap: [AppComponent]
})
export class ExpenseModule { }
