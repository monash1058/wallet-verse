import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalErrorHandler } from './shared/error/global-error-handler';
import { AuthInterceptor } from './shared/interceptor/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, SharedModule, HttpClientModule, BrowserAnimationsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent],
})
export class AppModule {}
