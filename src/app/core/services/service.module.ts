import { NgModule } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { ApiClient } from '../clients/api.client';
import { LocalStorageService } from './local-storage.service';
import { ResponsiveService } from './responsive.service';

@NgModule({
  providers: [
    // App
    ApiClient,
    ErrorHandlerService,
    LocalStorageService,
    ResponsiveService
  ]
})
export class ServiceModule { }
