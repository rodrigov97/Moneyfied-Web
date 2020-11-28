import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';

import { MainRoutingModule } from './main.routing.module';

import { MainComponent } from './main.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProfileService } from './my-profile/profile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IncomeModule } from './income/income.module';
import { ExpenseModule } from './expense/expense.module';
import { GoalModule } from './goal/goal.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // App
    MainRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxChartsModule,
    SharedModule,
    DashboardModule,
    IncomeModule,
    ExpenseModule,
    GoalModule
  ],
  declarations: [
    // App
    MainComponent,
    MyProfileComponent,
  ],
  providers: [
    // App
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class MainModule { }
