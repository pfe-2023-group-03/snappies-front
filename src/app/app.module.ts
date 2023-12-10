// app.module.ts

import { NgModule, isDevMode, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersModule } from './users/users.module';
import { NavbarModule } from './navbar/navbar.module';
import { LoginformModule } from './loginform/loginform.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { AdminModule } from './admin/admin.module';
import { NavigationService } from './services/navigation.service';
import { OrderModule } from './order/order.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
      AppRoutingModule,
      UsersModule,
      NavbarModule,
      LoginformModule,
      AdminModule,
      OrderModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatToolbarModule,
      MatSlideToggleModule,
      
      ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
providers: [
  AuthenticationInterceptor,
  NavigationService
],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
