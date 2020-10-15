import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';

import { MainRoutingModule } from './main.routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeComponent } from './income/income.component';
import { IncomeGridComponent } from './income/income-grid/income-grid.component';
import { MainComponent } from './main.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProfileService } from './my-profile/profile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

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
    IncomeGridComponent
  ],
  providers: [
    // App
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class MainModule { }
