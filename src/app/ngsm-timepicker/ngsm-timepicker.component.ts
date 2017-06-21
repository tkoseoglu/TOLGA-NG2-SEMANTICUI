import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'ngsm-timepicker',
  templateUrl: './ngsm-timepicker.component.html',
  styleUrls: ['./ngsm-timepicker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgsmTimepickerComponent),
      multi: true
    }
  ]
})
export class NgsmTimepickerComponent implements OnInit, ControlValueAccessor {

  @Input()
  id: string;

  @Input()
  hint: string;

  private innerValue: string;

  constructor() { }

  ngOnInit() {
    (<any>$('#' + this.id)).calendar({
      type: 'time',
      onChange: jQuery.proxy(function (value) {
        console.log("time changed %s", value);
        this.propagateChange(value);
      }, this)
    });
  }

  get value(): any {
    return this.innerValue;
  };

  writeValue(value: any) {
    if (value !== undefined) {
      this.innerValue = value;
    }
  }

  onTouchedCallback() { }
  registerOnTouched() { }
  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }


}
