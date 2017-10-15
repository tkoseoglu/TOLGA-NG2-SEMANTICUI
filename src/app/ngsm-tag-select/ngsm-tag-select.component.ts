import { Component, OnInit, Input, forwardRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subject, Observable } from "rxjs";
import { NgsmAppService } from "../ngsm.app.service";

@Component({
  selector: 'ngsm-tag-select',
  templateUrl: './ngsm-tag-select.component.html',
  styleUrls: ['./ngsm-tag-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgsmTagSelectComponent),
      multi: true
    }
  ]
})
export class NgsmTagSelectComponent implements OnInit {

  @Input()
  id: string;

  @Input()
  url: string;

  @Input()
  allowAdditions: boolean = false;

  @Input()
  defaultTexts: Subject<string> = new Subject<string>();

  @Output()
  selectedItem: EventEmitter<any> = new EventEmitter<any>();

  private defaultText: string = "Type to find";
  private innerValue: any;
  private innerValueString: string = "";

  constructor(private ngsmAppService: NgsmAppService,
    private chRef: ChangeDetectorRef) { }


  initDropdown() {
    this.clear();
    var self = this;
    setTimeout(function () {
      (<any>$(`#${self.id}.search.dropdown`)).dropdown({
        minCharacters: 1,
        allowAdditions: self.allowAdditions,
        onChange: jQuery.proxy(function (value, text, $selectedItem) {
          self.propagateChange(value);
        }, self),
        onLabelSelect: jQuery.proxy(function ($selectedLabels) {
          if (!$selectedLabels)
            self.selectedItem.emit($selectedLabels.innerText);
        }, self),
        apiSettings: {
          url: `${self.url}/{query}`,
          method: 'get',
          saveRemoteData: false,
          onResponse: function (results) {
            var response = {
              success: true,
              results: []
            };
            $.each(results, function (index, item) {
              response.results.push({
                value: item.id,
                name: item.name
              });
            });
            return response;
          }
        }
      });
    }, 250);

    this.defaultTexts.subscribe(newDefaultText => {
      this.ngsmAppService.log("ngsm-tag-select", `New default text ${newDefaultText}`);
      this.defaultText = newDefaultText;
      (<any>$("#defaultText")).text(newDefaultText);
      try {
        this.chRef.detectChanges();
      } catch (e) {

      }
    });

  }

  ngOnInit() {
    this.initDropdown();
  }

  get value(): any {
    return this.innerValue;
  };

  writeValue(value: any) {
    if (value !== undefined) {
      this.innerValue = value;
      if (this.innerValue instanceof Array) {
        this.innerValueString = this.innerValue.map(function (a) {
          return a.value.toString();
        }).join();
        this.initDropdown();
      }
    }
  }

  clear() {
    (<any>$(`#${this.id}.search.dropdown`)).dropdown('clear');
  }

  onTouchedCallback() { }
  registerOnTouched() { }
  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }


}
