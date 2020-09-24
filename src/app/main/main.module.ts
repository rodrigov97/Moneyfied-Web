import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';

import { MainRoutingModule } from './main.routing.module';

import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // App
    MainRoutingModule,
    SharedModule
  ],
  declarations: [
    MainComponent
  ],
  bootstrap: [AppComponent]
})
export class MainModule { }
