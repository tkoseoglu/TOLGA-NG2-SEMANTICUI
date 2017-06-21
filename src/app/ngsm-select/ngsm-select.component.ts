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
  allowAdditions: boolean = true;

  @Input()
  options = [];

  @Input()
  clear: Subject<any>;
 
  private selectedItems = [];

  constructor() { }

  ngOnInit() {

    console.log(`Allow Additions ${this.allowAdditions}`);

    (<any>$('.search.dropdown')).dropdown({
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
      console.log("Clear ngsm-select");
      (<any>$(".search.dropdown")).dropdown('clear');
      this.selectedItems = [];
    });
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
      setTimeout(function () {
        (<any>$('.search.dropdown')).dropdown('set selected', this.selectedItems)
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
