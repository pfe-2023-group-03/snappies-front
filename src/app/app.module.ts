// app.module.ts

import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersModule } from './users/users.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, UsersModule, HttpClientModule, BrowserAnimationsModule, MatToolbarModule, MatSlideToggleModule, ServiceWorkerModule.register('ngsw-worker.js', {
  //enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  bootstrap: [AppComponent],
})
export class AppModule { }
