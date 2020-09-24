import { NgModule } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { ApiClient } from '../clients/api.client';
import { LocalStorageService } from './local-storage.service';

@NgModule({
  providers: [
    // App
    ApiClient,
    ErrorHandlerService,
    LocalStorageService
  ]
})
export class ServiceModule { }
