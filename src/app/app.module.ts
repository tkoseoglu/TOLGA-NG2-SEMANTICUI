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
import { NgsmTablepagerComponent } from './ngsm-tablepager/ngsm-tablepager.component';
import { NgsmTimepickerComponent } from './ngsm-timepicker/ngsm-timepicker.component';
import { NgsmAutocompleteComponent } from './ngsm-autocomplete/ngsm-autocomplete.component';

import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    NgsmLoaderComponent,
    NgsmSelectComponent,
    NgsmDatepickerComponent,
    NgsmTablepagerComponent,
    NgsmTimepickerComponent,
    NgsmAutocompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouterModule    
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
