import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subject, Observable } from "rxjs";

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

  private myInterval: any;
  private selectedItems: any = [];
  
  constructor() { }

  init() {
    (<any>$(`#${this.id}.search.dropdown`)).dropdown({
      minCharacters: 2,
      onChange: jQuery.proxy(function (value, text, $selectedItem) {
        console.log(`Multiselect selected items: ${value}, ${text}`);
        this.propagateChange(value);
      }, this),
      apiSettings: {
        url: `${this.url}/{query}`,
        method: 'get',
        onResponse: function (results) {
          var response = {
            success: true,
            results: []
          };
          $.each(results, function (index, item) {
            response.results.push({
              value: item.id,
              name: item.fullName
            });
          });
          console.log(response);
          return response;
        }
      }
    });
    this.myInterval.unsubscribe();
  }

  ngOnInit() {
    console.log(`Multiselect: id: ${this.id}, url: ${this.url}`);
    this.myInterval = Observable.interval(100).subscribe(() => this.init());
  }

  get value(): any {
    return this.selectedItems;
  };

  writeValue(value: any) {
    if (value !== undefined && value !== null) {
      this.selectedItems = value;
      console.log(`Multiselect: selectedItems ${this.selectedItems}`);      
      this.myInterval = Observable.interval(100).subscribe(() => this.init());
    }
  }

  onTouchedCallback() { }
  registerOnTouched() { }
  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }
}
