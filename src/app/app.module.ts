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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
