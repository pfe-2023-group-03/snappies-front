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
import { OrderDetailsModule } from './order-details/order-details.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { AdminModule } from './admin/admin.module';
import { NavigationService } from './services/navigation.service';
import { OrderModule } from './order/order.module';
import { UserformModule } from './userform/userform.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './authentication.interceptor';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule,
    NavbarModule,
    LoginformModule,
    OrderDetailsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    AdminModule,
    OrderModule,
    UserformModule,
    DeliveriesModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  NavigationService
],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
