import * as $ from 'jquery';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router/app-router.module';
import { AppHomeComponent } from './app-home/app-home.component';
import { NgsmLoaderComponent } from './ngsm-loader/ngsm-loader.component';
import { NgsmSelectComponent } from './ngsm-select/ngsm-select.component';
import { NgsmDatepickerComponent } from './ngsm-datepicker/ngsm-datepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    NgsmLoaderComponent,
    NgsmSelectComponent,
    NgsmDatepickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }
