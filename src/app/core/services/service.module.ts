import { NgModule } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { ApiClient } from '../clients/api.client';

@NgModule({
  providers: [
    // App
    ApiClient,
    ErrorHandlerService
  ]
})
export class ServiceModule { }
