import { NgModule } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { ApiClient } from '../clients/api.client';
import { LocalStorageService } from './local-storage.service';
import { ResponsiveService } from './responsive.service';
import { DateService } from './date.service';
import { NumberHandlerService } from './number-handler.service';

@NgModule({
  providers: [
    // App
    ApiClient,
    ErrorHandlerService,
    LocalStorageService,
    ResponsiveService,
    DateService,
    NumberHandlerService,
  ]
})
export class ServiceModule { }
