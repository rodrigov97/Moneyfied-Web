import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from '../../app.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from '../main.routing.module';
import { DashboardService } from './dashboard.service';
import { GridListComponent } from './grid-list/grid-list.component';
import { ComparisonChartComponent } from './comparison-chart/comparison-chart.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardInfoComponent } from './dashboard-info/dashboard-info.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // App
    MainRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxChartsModule,
    SharedModule
  ],
  declarations: [
    // App
    DashboardComponent,
    GridListComponent,
    ComparisonChartComponent,
    DashboardInfoComponent
  ],
  providers: [
    // App
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class DashboardModule { }
