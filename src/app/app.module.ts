import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuListModule } from './menu-list/menu-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';

import { F01001Component } from './f01001/f01001.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BnNgIdleService } from 'bn-ng-idle';


import { MaterialModule } from './material/material.module';
import { F02001Component } from './f02001/f02001.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenInterceptor } from './token.interceptor';
import { F01002Component } from './f01002/f01002.component';
// import { GoogleMapsModule } from '@angular/google-maps';
import { DatePipe } from '@angular/common';
import { F03001Component } from './f03001/f03001.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    F01001Component,
    F02001Component,
    F01002Component,

    F03001Component,
  ],
  imports: [
    BrowserModule,
    MenuListModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientJsonpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    // GoogleMapsModule
  ],
  providers: [
    BnNgIdleService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
