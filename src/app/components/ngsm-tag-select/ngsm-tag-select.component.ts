import { Component, OnChanges, Input, forwardRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subject, Observable, Subscription } from "rxjs";
import { NgsmAppService } from "../../ngsm.app.service";

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
export class NgsmTagSelectComponent implements OnChanges {

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
  private defaultTextId: string = "";
  private innerValue: any;
  private innerValueString: string = "";
  private defaultTextsSub: Subscription;

  private allSelections = [];

  constructor(private ngsmAppService: NgsmAppService,
    private chRef: ChangeDetectorRef) { }


  setIsValidClass() {
    if (this.isRequired && this.allSelections.length === 0) {
      this.isValidClass = "invalid";
      this.defaultText = "Type to find stuff";
    }
    else if (this.isRequired && this.allSelections && this.allSelections.length > 0)
      this.isValidClass = "valid";
  }

  init() {

    this.defaultTextId = `${this.id}-defaultText`;

    this.clear();
    this.ngsmAppService.log("ngsm-tag-select", `init: id: ${this.id}, url ${this.url}`);
    this.setIsValidClass();

    var self = this;
    setTimeout(function () {
      sessionStorage.clear();
      (<any>$(`#${self.id}.search.dropdown`)).dropdown({
        minCharacters: 1,
        keepOnScreen: false,
        showOnFocus: false,
        saveRemoteData: false,
        allowAdditions: self.allowAdditions,
        onAdd: jQuery.proxy(function (selectedId, selectedText, $choice) {
          self.ngsmAppService.log("ngsm-tag-select: onAdd: selectedId", selectedId);
          self.ngsmAppService.log("ngsm-tag-select: onAdd: selectedText", selectedText);

          let item = self.allSelections.filter(p => p.id === selectedId)[0];
          if (!item) {
            self.allSelections.push({
              id: +selectedId,
              text: selectedText
            });
            self.setIsValidClass();
            self.propagateChange(self.allSelections);
          }
        }, self),
        onRemove: jQuery.proxy(function (selectedId, selectedText, $choice) {
          self.ngsmAppService.log("ngsm-tag-select: onRemove: selectedId", selectedId);
          self.ngsmAppService.log("ngsm-tag-select: onRemove: selectedText", selectedText);

          let item = self.allSelections.filter(p => p.id === +selectedId)[0];
          if (item) {
            let index = self.allSelections.indexOf(item);
            if (index >= 0) {
              self.allSelections.splice(index, 1);
            }
          }
          self.setIsValidClass();
          self.propagateChange(self.allSelections);
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
                name: item.text
              });
            });
            return response;
          }
        }
      });
    }, 250);

    if (this.defaultTexts) {
      this.defaultTexts.subscribe(newDefaultText => {
        this.ngsmAppService.log("ngsm-tag-select", `defaultText: ${newDefaultText}, defaultTextId: ${this.defaultTextId}`);
        this.defaultText = newDefaultText;
        //this.clear();
        (<any>$(`#${this.id}-defaultText`)).text(newDefaultText);
        this.setIsValidClass();
        try {
          this.chRef.detectChanges();
        } catch (e) {

        }
      });
    }

  }

  ngOnChanges() {
    if (this.id && this.url)
      this.init();
  }

  get value(): any {
    console.log(this.innerValue);
    return this.innerValue;
  };

  writeValue(value: any) {
    if (value !== undefined && value !== null) {
      this.innerValue = value;
      this.ngsmAppService.log("ngsm-tag-select", `writeValue: innerValue: ${this.innerValue}`);
      if (this.innerValue instanceof Array) {
        this.allSelections = this.innerValue;
        this.innerValueString = this.innerValue.map(function (a) {
          return a.id.toString();
        }).join();
        this.init();
      }
    }
  }

  clear() {
    if (this.id) {
      this.ngsmAppService.log("ngsm-tag-select", `clear: id: ${this.id}`);
      (<any>$(`#${this.id}.search.dropdown`)).dropdown('clear');
    }
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
