import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';

import { MainRoutingModule } from './main.routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { MyProfileComponent } from './my-profile/my-profile.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // App
    MainRoutingModule,
    SharedModule
  ],
  declarations: [
    MainComponent,
    DashboardComponent,
    MyProfileComponent
  ],
  bootstrap: [AppComponent]
})
export class MainModule { }
