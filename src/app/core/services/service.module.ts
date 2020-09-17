import { NgModule } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { ApiClient } from '../clients/api.client';
import { LocalStoreService } from './local-store.service';

@NgModule({
  providers: [
    // App
    ApiClient,
    ErrorHandlerService,
    LocalStoreService
  ]
})
export class ServiceModule { }
