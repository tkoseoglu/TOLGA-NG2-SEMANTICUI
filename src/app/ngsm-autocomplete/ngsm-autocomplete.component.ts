import { Component, OnInit, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subject, Observable } from "rxjs";
import { NgsmAppService } from "../ngsm.app.service";

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
  defaultTexts: Subject<string> = new Subject<string>();

  @Input()
  url: string;

  @Input()
  isRequired: boolean = false;

  private defaultText: string = "Type to find";
  private selectedItem: any;
  private myInterval: any;

  constructor(private ngsmAppService: NgsmAppService,
    private chRef: ChangeDetectorRef) { }


  getClassNames() {   
    if (this.isRequired && !this.defaultText)
      return "invalid";
    else if (this.isRequired && this.defaultText)
      return "valid";    
  }

  init() {
    this.ngsmAppService.log("ngsm-autocomplete", "init");
    (<any>$(`#${this.id}.search.dropdown`)).dropdown({
      minCharacters: 2,
      onChange: jQuery.proxy(function (value, text, $selectedItem) {
        this.propagateChange(value);
      }, this),
      hideError: true,
      apiSettings: {
        url: `${this.url}/{query}`,
        method: 'get',
        hideError: true,
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
          console.log(`ngsm-autocomplete: Error ${error}`);
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

    this.defaultTexts.subscribe(newDefaultText => {
      this.ngsmAppService.log("ngsm-autocomplete", `New default text ${newDefaultText}`);
      this.defaultText = newDefaultText;
      (<any>$("#defaultText")).text(newDefaultText);
      try {
        this.chRef.detectChanges();
      } catch (e) {

      }
    });

    if (this.myInterval !== undefined)
      this.myInterval.unsubscribe();
    sessionStorage.clear();
  }

  ngOnInit() {
    this.ngsmAppService.log("ngsm-autocomplete", `id: ${this.id}, url: ${this.url}`);
    this.myInterval = Observable.interval(100).subscribe(() => this.init());
  }

  get value(): any {
    return this.selectedItem;
  };

  writeValue(value: any) {
    if (value !== undefined) {
      this.selectedItem = value;
      this.ngsmAppService.log("ngsm-autocomplete", `SelectedItem ${this.selectedItem}, DefaultText: ${this.defaultText}`);
    }
  }

  onTouchedCallback() { }
  registerOnTouched() { }
  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }


}
