import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subject, Observable } from "rxjs";
import { AppService } from "../app.service";
@Component({
  selector: 'ngsm-select',
  templateUrl: './ngsm-select.component.html',
  styleUrls: ['./ngsm-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgsmSelectComponent),
      multi: true
    }
  ]
})
export class NgsmSelectComponent implements OnInit, ControlValueAccessor {

  @Input()
  id: string;

  @Input()
  url: string;

  @Input()
  defaultText: string;

  @Input()
  previousSelectedItems: any = [];

  private initInterval: any;
  private changesInterval: any;
  private selectedItems: any = [];
  private isInitiating: boolean = false;

  constructor(private appService: AppService) { }

  init() {
    this.appService.log("ngsm-select","init");
    (<any>$(`#${this.id}.search.dropdown`)).dropdown({
      minCharacters: 1,
      allowAdditions: true,
      onChange: jQuery.proxy(function (value, text, $selectedItem) {
        console.log(`Multiselect selected items: ${value}, ${text}`);
        this.propagateChange(value);
      }, this),
      apiSettings: {
        url: `${this.url}/{query}`,
        method: 'get',
        saveRemoteData: false,
        onResponse: function (results) {
          var response = {
            success: true,
            results: []
          };
          $.each(results, function (index, item) {
            response.results.push({
              value: item.value,
              name: item.name
            });
          });
          this.appService.log(response);
          return response;
        }
      }
    });
    if (this.initInterval !== undefined)
      this.initInterval.unsubscribe();
    if (this.changesInterval !== undefined)
      this.changesInterval.unsubscribe();
    this.isInitiating = false;
    sessionStorage.clear();
  }

  ngOnInit() {
    this.appService.log("ngsm-select", `id: ${this.id}, url: ${this.url}`);
    this.initInterval = Observable.interval(10).subscribe(() => this.init());
    this.isInitiating = true;
  }

  get value(): any {
    return this.selectedItems;
  };

  writeValue(value: any) {
    if (value !== undefined && value !== null) {
      this.selectedItems = value;
      this.appService.log("ngsm-select",`SelectedItems ${this.selectedItems}`);
      if (!this.isInitiating) {
        this.changesInterval = Observable.interval(1000).subscribe(() => this.init());
        this.isInitiating = true;
      }
    }
  }

  onTouchedCallback() { }
  registerOnTouched() { }
  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }
}
