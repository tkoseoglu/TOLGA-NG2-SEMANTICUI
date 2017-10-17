import { Component, OnInit, Input, forwardRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subject, Observable, Subscription } from "rxjs";
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

  @Input()
  isRequired: boolean = false;

  @Output()
  selectedItem: EventEmitter<any> = new EventEmitter<any>();

  private isValidClass: string = "";
  private defaultText: string = "Type to find";
  private innerValue: any;
  private innerValueString: string = "";
  private defaultTextsSub: Subscription;

  constructor(private ngsmAppService: NgsmAppService,
    private chRef: ChangeDetectorRef) { }


  setIsValidClass(selectedItem) {
    if (this.isRequired && (!selectedItem || selectedItem.indexOf("Type") >= 0))
      this.isValidClass = "invalid";
    else if (this.isRequired && selectedItem)
      this.isValidClass = "valid";
  }

  init() {
    this.clear();
    this.ngsmAppService.log("ngsm-tag-select", "init");
    this.setIsValidClass("");

    var self = this;
    setTimeout(function () {
      (<any>$(`#${self.id}.search.dropdown`)).dropdown({
        minCharacters: 1,
        allowAdditions: self.allowAdditions,
        onChange: jQuery.proxy(function (value, text, $selectedItem) {
          self.ngsmAppService.log("ngsm-tag-select: value", value);
          self.setIsValidClass(value);
          self.propagateChange(value);
        }, self),
        onLabelSelect: jQuery.proxy(function ($selectedLabels) {
          if (!$selectedLabels) {
            self.ngsmAppService.log("ngsm-tag-select: selectedLabels", $selectedLabels.innerText);
            self.selectedItem.emit($selectedLabels.innerText);
          }

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

    if (this.defaultTexts) {
      this.defaultTexts.subscribe(newDefaultText => {
        this.ngsmAppService.log("ngsm-tag-select", `New default text ${newDefaultText}`);
        this.defaultText = newDefaultText;
        (<any>$("#defaultText")).text(newDefaultText);
        this.setIsValidClass(newDefaultText);
        try {
          this.chRef.detectChanges();
        } catch (e) {

        }
      });
    }

  }

  ngOnInit() {
    this.init();
  }

  get value(): any {
    console.log(this.innerValue);
    return this.innerValue;
  };

  writeValue(value: any) {
    if (value !== undefined) {
      this.innerValue = value;
      if (this.innerValue instanceof Array) {
        this.innerValueString = this.innerValue.map(function (a) {
          return a.value.toString();
        }).join();
        this.init();
      }
    }
  }

  clear() {
    this.ngsmAppService.log("ngsm-tag-select", "clear");
    (<any>$(`#${this.id}.search.dropdown`)).dropdown('clear');
  }

  onTouchedCallback() { }
  registerOnTouched() { }
  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  ngOnDestroy() {

  }


}
