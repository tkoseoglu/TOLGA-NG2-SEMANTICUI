import * as $ from 'jquery';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router/app-router.module';
import { AppHomeComponent } from './app-home/app-home.component';
import { NgsmLoaderComponent } from './components/ngsm-loader/ngsm-loader.component';
import { NgsmSelectComponent } from './components/ngsm-select/ngsm-select.component';
import { NgsmDatepickerComponent } from './components/ngsm-datepicker/ngsm-datepicker.component';
import { NgsmTablepagerComponent } from './components/ngsm-tablepager/ngsm-tablepager.component';
import { NgsmTimepickerComponent } from './components/ngsm-timepicker/ngsm-timepicker.component';
import { NgsmAutocompleteComponent } from './components/ngsm-autocomplete/ngsm-autocomplete.component';
import { NgsmTagSelectComponent } from './components/ngsm-tag-select/ngsm-tag-select.component';
import { NgsmModalComponent } from './components/ngsm-modal/ngsm-modal.component';

import { NgsmAppService } from './ngsm.app.service';

import { NgsmAutocompleteTestComponent } from './directives/ngsm-autocomplete-test/ngsm-autocomplete-test.component';
import { NgsmTagSelectTestComponent } from './directives/ngsm-tag-select-test/ngsm-tag-select-test.component';
import { NgsmDatepickerTestComponent } from './directives/ngsm-datepicker-test/ngsm-datepicker-test.component';
import { NgsmTimepickerTestComponent } from './directives/ngsm-timepicker-test/ngsm-timepicker-test.component';
import { NgsmLoaderTestComponent } from './directives/ngsm-loader-test/ngsm-loader-test.component';
import { NgsmTablepagerTestComponent } from './directives/ngsm-tablepager-test/ngsm-tablepager-test.component';
import { NgsmSelectTestComponent } from './directives/ngsm-select-test/ngsm-select-test.component';
import { NgsmModalTestComponent } from './directives/ngsm-modal-test/ngsm-modal-test.component';


@NgModule({
  imports: [   
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouterModule    
  ],
  declarations: [
    AppComponent,
    AppHomeComponent,
    NgsmLoaderComponent,
    NgsmSelectComponent,
    NgsmDatepickerComponent,
    NgsmTablepagerComponent,
    NgsmTimepickerComponent,
    NgsmAutocompleteComponent,
    NgsmTagSelectComponent,
    NgsmAutocompleteTestComponent,
    NgsmTagSelectTestComponent,
    NgsmDatepickerTestComponent,
    NgsmTimepickerTestComponent,
    NgsmLoaderTestComponent,
    NgsmTablepagerTestComponent,
    NgsmSelectTestComponent,
    NgsmModalComponent,    
    NgsmModalTestComponent
  ], 
  providers: [NgsmAppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
