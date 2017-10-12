import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subject, Observable } from "rxjs";
import { NgsmAppService } from "../ngsm.app.service";
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

  @Input()
  allowAdditions: boolean = false;

  @Output()
  selectedItem: EventEmitter<any> = new EventEmitter<any>();

  private initInterval: any;
  private changesInterval: any;
  private selectedItems: any = [];
  private isInitiating: boolean = false;

  constructor(private ngsmAppService: NgsmAppService) { }

  init() {
    this.ngsmAppService.log("ngsm-select", "init");
    (<any>$(`#${this.id}.search.dropdown`)).dropdown({
      minCharacters: 1,
      allowAdditions: this.allowAdditions,
      onChange: jQuery.proxy(function (value, text, $selectedItem) {
        this.propagateChange(value);
      }, this),
      onLabelSelect: jQuery.proxy(function ($selectedLabels) {        
        this.selectedItem.emit($selectedLabels.innerText);
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
    this.ngsmAppService.log("ngsm-select", `id: ${this.id}, url: ${this.url}`);
    this.initInterval = Observable.interval(10).subscribe(() => this.init());
    this.isInitiating = true;
  }

  itemClicked(item: any) {
    console.log(item);
  }

  get value(): any {
    return this.selectedItems;
  };

  writeValue(value: any) {
    if (value !== undefined && value !== null) {
      this.selectedItems = value;
      this.ngsmAppService.log("ngsm-select", `SelectedItems ${this.selectedItems}`);
      if (!this.isInitiating) {
        (<any>$(`#${this.id}.search.dropdown`)).dropdown('clear');

        this.changesInterval = Observable.interval(100).subscribe(() => this.init());
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
