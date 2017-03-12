import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent implements OnInit {

  ngsmLoaderShow: boolean = true;
  ngsmLoaderIsInverted: boolean = true;
  ngsmLoaderMessage: string = "My Loading Message...";
  ngsmLoaderUsage: string = "<ngsm-loader [showWhen]=\"\" [isInverted]=\"\" [message]=\"\"></ngsm-loader>";

  ngsmSelectForm: FormGroup;
  ngsmSelectClear: Subject<any> = new Subject();
  ngsmSelectedCountries = ["Germany", "England"];
  ngsmSelectAllowAdditions: boolean = true;
  ngsmSelectIsMulti: boolean = true;
  ngsmOptions = ["Germany", "England", "United States", "Canada", "Span", "Italy", "Mexico", "Turkey", "Japan", "China"];

  ngsmDatepickerForm: FormGroup;
  ngsmDatepickerSelectedDate = moment().format("MMMM DD, YYYY");

  constructor(private formBuilder: FormBuilder) { }

  toggleLoader() {
    this.ngsmLoaderShow = !this.ngsmLoaderShow;
  }

  clearSelect() {
    this.ngsmSelectClear.next(true);
  }

  ngOnInit() {
    this.ngsmSelectForm = this.formBuilder.group({
      countries: [this.ngsmSelectedCountries]
    });
    this.ngsmDatepickerForm = this.formBuilder.group({
      myDate: [this.ngsmDatepickerSelectedDate]
    });
  }

}
