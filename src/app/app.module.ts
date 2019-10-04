import { NgModule,ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GlobalErrorHandler } from './services/error/basicErrorHandler';
import { RequestInterceptor } from './services/server/request-interceptor.service';

@NgModule({
  declarations: [
  AppComponent
],
entryComponents: [],
imports: [
  BrowserModule,
  HttpClientModule,
  IonicModule.forRoot({
      rippleEffect: false
  }),
  IonicStorageModule.forRoot(),
  AppRoutingModule
],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
],
bootstrap: [AppComponent]
})
export class AppModule {}
