import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

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
    path: 'my-profile',
    component: MyProfileComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
