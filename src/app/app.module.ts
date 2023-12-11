// app.module.ts

import { NgModule, isDevMode, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersModule } from './users/users.module';
import { LoginformModule } from './loginform/loginform.module';
import { NavbarModule } from './navbar/navbar.module'
import { ordersDeliveryModule } from './ordersDelivery/ordersDelivery.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DeliveriesModule } from './deliveries/deliveries.module';
// import { AuthenticationInterceptor } from './authentication.interceptor';
import { AdminModule } from './admin/admin.module';
import { NavigationService } from './services/navigation.service';
import { OrderModule } from './order/order.module';
import { UserformModule } from './userform/userform.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './authentication.interceptor'; // Ajoutez le chemin correct
import { MatListModule } from '@angular/material/list';

import { ClientformModule } from './clientform/clientform.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
      AppRoutingModule,
      UsersModule,
      NavbarModule,
      LoginformModule,
      AdminModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatToolbarModule,
      MatSlideToggleModule,
      DeliveriesModule,
      MatListModule,
      UserformModule,
      ClientformModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  // AuthenticationInterceptor,
  NavigationService
],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
