import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServiceModule } from './services/service.module';


@NgModule({
  imports: [
    // Angular
    HttpClientModule,
    // App
    ServiceModule
  ]
})
export class CoreModule { }
