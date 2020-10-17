import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';

import { MainRoutingModule } from './main.routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FormRegisterIncomeComponent } from './income/form-register/form-register-income.component';
import { IncomeComponent } from './income/income.component';
import { IncomeGridComponent } from './income/income-grid/income-grid.component';
import { IncomeService } from './income/income.service';
import { MainComponent } from './main.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProfileService } from './my-profile/profile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IncomeInfoComponent } from './income/income-info/income-info.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // App
    MainRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    SharedModule
  ],
  declarations: [
    // App
    MainComponent,
    DashboardComponent,
    MyProfileComponent,
    IncomeComponent,
    IncomeGridComponent,
    FormRegisterIncomeComponent,
    IncomeInfoComponent
  ],
  providers: [
    // App
    ProfileService,
    IncomeService
  ],
  bootstrap: [AppComponent]
})
export class MainModule { }
