import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { MainModule } from './main/main.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    // Angular
    AppComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // App
    CoreModule,
    SharedModule,
    AuthModule,
    MainModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
