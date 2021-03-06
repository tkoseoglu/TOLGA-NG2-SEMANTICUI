import { Component, OnChanges, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subject, Observable, Subscription } from "rxjs";
import { NgsmAppService } from "../../ngsm.app.service";

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
export class NgsmAutocompleteComponent implements OnChanges, ControlValueAccessor {

  @Input()
  id: string;

  @Input()
  allowClear: boolean = false;

  @Input()
  clearMessage: string = "Clear";

  @Input()
  defaultTexts: Subject<string> = new Subject<string>();

  @Input()
  url: string;

  @Input()
  isRequired: boolean = false;

  isValidClass: string = "";
  defaultText: string = "Type to find";
  defaultTextId: string = "";
  selectedItem: any;
  defaultTextsSub: Subscription;


  constructor(private ngsmAppService: NgsmAppService,
    private chRef: ChangeDetectorRef) { }

  setIsValidClass(selectedItem) {    
    if (this.isRequired && (!selectedItem || selectedItem.indexOf("Type") >= 0))
      this.isValidClass = "invalid";
    else if (this.isRequired && selectedItem)
      this.isValidClass = "valid";
  }

  clear() {
    this.selectedItem = null;
    this.defaultTexts.next("Type to find");
    (<any>$(`#${this.id}`)).dropdown('clear');
    this.setIsValidClass("");
    this.propagateChange("");
  }

  init() {
    this.defaultTextId = `${this.id}-defaultText`;
    this.ngsmAppService.log("ngsm-autocomplete", `init: id: ${this.id}, url ${this.url}`);
    this.setIsValidClass("");

    let self = this;
    setTimeout(function () {
      sessionStorage.clear();
      (<any>$(`#${self.id}`)).dropdown({
        minCharacters: 2,
        onChange: jQuery.proxy(function (value, text, $selectedItem) {
          self.selectedItem = value;
          self.setIsValidClass(value);
          self.propagateChange(value);
        }, self),
        hideError: true,
        saveRemoteData: false,
        apiSettings: {
          url: `${self.url}/{query}`,
          method: 'get',
          hideError: true,
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
          },
          onError: function (error) {
            this.ngsmAppService.error(`ngsm-autocomplete: Error ${error}`);
          }
        },
        error: {
          action: 'You called a dropdown action that was not defined',
          alreadySetup: 'Once a select has been initialized behaviors must be called on the created ui dropdown',
          labels: 'Allowing user additions currently requires the use of labels.',
          method: 'The method you called is not defined.',
          noTransition: 'This module requires ui transitions <https: github.com="" semantic-org="" ui-transition="">'
        }
      });
    }, 250);

    if (this.defaultTexts) {
      this.defaultTextsSub = this.defaultTexts.subscribe(newDefaultText => {
        this.ngsmAppService.log("ngsm-autocomplete", `defaultText: ${newDefaultText}, defaultTextId: ${this.defaultTextId}`);
        this.defaultText = newDefaultText;
        this.setIsValidClass(newDefaultText);
        (<any>$(`#${this.defaultTextId}`)).text(newDefaultText);
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
    return this.selectedItem;
  };

  writeValue(value: any) {
    if (value !== undefined) {
      this.selectedItem = value;
      this.ngsmAppService.log("ngsm-autocomplete", `writeValue: selectedItem: ${this.selectedItem}`);
    }
  }

  onTouchedCallback() { }
  registerOnTouched() { }
  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  ngOnDestroy() {
    if (this.defaultTextsSub)
      this.defaultTextsSub.unsubscribe();
  }


}
