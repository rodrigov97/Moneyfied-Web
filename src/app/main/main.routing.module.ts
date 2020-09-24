import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

const ROUTES: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'main',
}, {
  path: 'main',
  component: MainComponent
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
