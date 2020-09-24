import { NgModule } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { ApiClient } from '../clients/api.client';
import { LocalStoreService } from './local-store.service';
import { ResponsiveService } from './responsive.service';

@NgModule({
  providers: [
    // App
    ApiClient,
    ErrorHandlerService,
    LocalStoreService,
    ResponsiveService
  ]
})
export class ServiceModule { }
