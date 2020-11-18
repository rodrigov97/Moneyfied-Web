import { NgModule } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { ApiClient } from '../clients/api.client';
import { LocalStorageService } from './local-storage.service';
import { ResponsiveService } from './responsive.service';
import { DateService } from './date.service';
import { NumberHandlerService } from './number-handler.service';
import { RequestInterceptorService } from './request-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenErrorHandlerService } from './token-error-handler.service';

@NgModule({
  providers: [
    // App
    ApiClient,
    ErrorHandlerService,
    LocalStorageService,
    ResponsiveService,
    DateService,
    NumberHandlerService,
    TokenErrorHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    }
  ]
})
export class ServiceModule { }
