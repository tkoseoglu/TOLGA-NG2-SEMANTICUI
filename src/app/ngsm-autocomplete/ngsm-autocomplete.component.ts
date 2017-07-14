import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subject, Observable } from "rxjs";
import { AppService } from "../app.service";

@Component({
  selector: 'ngsm-autocomplete',
  templateUrl: './ngsm-autocomplete.component.html',
  styleUrls: ['./ngsm-autocomplete.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgsmAutocompleteComponent),
      multi: true
    }
  ]
})
export class NgsmAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input()
  id: string;

  @Input()
  defaultText: string;

  @Input()
  url: string;

  private selectedItem: any;
  private myInterval: any;

  constructor(private appService: AppService) { }

  init() {
    (<any>$(`#${this.id}.search.dropdown`)).dropdown({
      minCharacters: 2,
      onChange: jQuery.proxy(function (value, text, $selectedItem) {
        this.appService.log("ngsm-autocomplete", `${value}, ${text}`);
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
          this.appService.log("ngsm-autocomplete", response);
          return response;
        }
      }
    });
    this.myInterval.unsubscribe();
    sessionStorage.clear();
  }

  ngOnInit() {    
    this.appService.log("ngsm-autocomplete", `id: ${this.id}, url: ${this.url}`);
    this.myInterval = Observable.interval(100).subscribe(() => this.init());
  }

  get value(): any {
    return this.selectedItem;
  };

  writeValue(value: any) {
    if (value !== undefined) {
      this.selectedItem = value;
    }
  }

  onTouchedCallback() { }
  registerOnTouched() { }
  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }


}
