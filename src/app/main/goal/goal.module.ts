import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from 'src/app/app.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormRegisterGoalComponent } from './form-register/form-register-goal.component';
import { FormAddAmountComponent } from './form-add-amount/form-add-amount.component';
import { GoalComponent } from './goal.component';
import { GoalGridComponent } from './goal-grid/goal-grid.component';


@NgModule({
  imports: [
    // Angular
    CommonModule,
    // App
    ReactiveFormsModule,
    NgxDatatableModule,
    SharedModule
  ],
  exports: [
    // App
    GoalGridComponent
  ],
  declarations: [
    // App
    GoalComponent,
    GoalGridComponent,
    FormRegisterGoalComponent,
    FormAddAmountComponent
  ],
  providers: [
    // App
  ],
  bootstrap: [AppComponent]
})
export class GoalModule { }
