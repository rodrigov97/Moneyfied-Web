import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseComponent } from './expense/expense.component';
import { GoalComponent } from './goal/goal.component';
import { IncomeComponent } from './income/income.component';
import { MainComponent } from './main.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [{
  path: '',
  component: MainComponent,
  children: [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }, {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'incomes',
    component: IncomeComponent
  }, {
    path: 'expenses',
    component: ExpenseComponent
  }, {
    path: 'goals',
    component: GoalComponent
  }, {
    path: 'my-profile',
    component: MyProfileComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
