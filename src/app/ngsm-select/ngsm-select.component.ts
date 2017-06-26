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
  allowAdditions: boolean = true;

  @Input()
  options = [];

  @Input()
  clear: Subject<any>;

  private selectedItems = [];

  private myInterval: any;
  private clearInterval: any;

  constructor() { }

  init() {

    (<any>$(`#${this.id}.search.dropdown`)).dropdown({
      allowAdditions: this.allowAdditions,
      direction: 'downward',
      label: {
        transition: 'horizontal flip',
        duration: 200,
        variation: false
      },
      onChange: jQuery.proxy(function (value, text, $selectedItem) {
        this.propagateChange(this.selectedItems);
      }, this)
    });


    this.clear.subscribe(event => {
      console.log("Select: Clear Request");
      this.clearInterval = Observable.interval(1000).subscribe(() => this.empty());
    });

    this.myInterval.unsubscribe();

  }

  empty() {
    this.selectedItems = [];
    (<any>$(`#${this.id}.search.dropdown`)).dropdown('clear');    
    this.clearInterval.unsubscribe();
  }

  ngOnInit() {
    console.log(`Select: id: ${this.id}, allowAdditions: ${this.allowAdditions}, options: ${this.options}`);
    this.myInterval = Observable.interval(100).subscribe(() => this.init());
  }

  ngOnDestroy() {
    this.clear.unsubscribe();
  }

  get value(): any {
    return this.selectedItems;
  };

  writeValue(value: any) {
    if (value !== undefined) {
      this.selectedItems = value;
      console.log(`Select: selectedItems: ${this.selectedItems}`);
      setTimeout(function () {
        (<any>$(`#${this.id}.search.dropdown`)).dropdown('set selected', this.selectedItems);
      }, 250);
    }
  }

  onTouchedCallback() { }
  registerOnTouched() { }
  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

}
