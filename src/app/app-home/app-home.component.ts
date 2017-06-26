import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../app-models/user';

import 'rxjs/add/operator/skip';

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
  ngsmSelectUsage: string = " <ngsm-select [options]=\"\" [clear]=\"\" [allowAdditions]=\"\" formControlName=\"\"></ngsm-select>";

  ngsmAutocompleteForm: FormGroup;
  ngsmAutocompleteUsage: string = " <ngsm-autocomplete id=\"\" formControlName=\"\" url=\"\" currentItem=\"\"></ngsm-autocomplete>";
  myAutocomplete: string = "staffAutocomplete";
  ngsmAutocompleteUrl: string = "http://localhost:50198/api/util/autocompleteStaff";
  currentStaff: any = {
    value: 305,
    name: "Tolga Koseoglu"
  };  

  ngsmDatepickerForm: FormGroup;
  ngsmDatepickerSelectedDate = moment().format("MMMM DD, YYYY");
  ngsmDatepickerUsage: string = "<ngsm-datepicker id=\"\" formControlName=\"\" hint=\"\"></ngsm-datepicker>";

  ngsmTimepickerForm: FormGroup;
  ngsmTimepickerSelectedTime = moment().format("HH mm");
  ngsmTimepickerUsage: string = "<ngsm-timepicker id=\"\" formControlName=\"\" hint=\"\"></ngsm-timepicker>";

  rawUsers: Array<User> = new Array<User>();
  users: Observable<User>;
  ngsmTablepagerUsers: Array<User> = new Array<User>();
  ngsmTablepagerTotalNumberOfUsers: number = 0;
  ngsmTablepagerConfig = {
    page: 0,
    pageSize: 10
  };
  ngsmTablepagerUsage: string = "<ngsm-tablepager [totalNumberOfRecords]=\"\" [selectedPageSize]=\"\" [selectedPage]=\"\" (onPageSizeChange)=\"\" (onPageChange)=\"\"></ngsm-tablepager>";

  constructor(private formBuilder: FormBuilder) { }

  //component actions

  toggleLoader() {
    this.ngsmLoaderShow = !this.ngsmLoaderShow;
  }

  clearSelect() {
    this.ngsmSelectClear.next(true);
  }

  getUsers() {
    let startIndex = this.ngsmTablepagerConfig.page * this.ngsmTablepagerConfig.pageSize;
    let endIndex = startIndex + this.ngsmTablepagerConfig.pageSize;
    let filteredUsers = this.users.skip(this.ngsmTablepagerConfig.page * this.ngsmTablepagerConfig.pageSize).take(this.ngsmTablepagerConfig.pageSize);
    this.ngsmTablepagerUsers = new Array<User>();
    filteredUsers.subscribe(val => this.ngsmTablepagerUsers.push(val));
  }

  newPageSize(pageSize: number) {
    this.ngsmTablepagerConfig.pageSize = pageSize;
    this.ngsmTablepagerConfig.page = 0;
    this.getUsers();
  }

  newPage(page: number) {
    this.ngsmTablepagerConfig.page = page;
    this.getUsers();
  }

  //page actions
  scrollTo(elementId: string) {
    let scrollTop = ($(`#${elementId}`).offset().top) - 70;
    console.log(scrollTop);
    $("html,body").animate({
      scrollTop: scrollTop
    }, 500);
  }

  private seedTablePager() {
    this.rawUsers.push(new User("Tom", "Jones", new Date("1/1/1970")));
    this.rawUsers.push(new User("Peter", "Fonda", new Date("10/11/1950")));
    this.rawUsers.push(new User("Michael", "Moore", new Date("10/11/1950")));
    this.rawUsers.push(new User("Arnold", "Schwarzenegger", new Date("10/11/1950")));
    this.rawUsers.push(new User("Sylvester", "Stallone", new Date("10/11/1950")));
    this.rawUsers.push(new User("Bruce", "Willis", new Date("10/11/1950")));
    this.rawUsers.push(new User("Peter", "Ustinov", new Date("10/11/1950")));
    this.rawUsers.push(new User("Clark", "Gable", new Date("10/11/1950")));
    this.rawUsers.push(new User("Boris", "Becker", new Date("10/11/1950")));
    this.rawUsers.push(new User("Ivan", "Lendle", new Date("10/11/1950")));

    // this.rawUsers.push(new User("Juergen", "Schult", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lars", "Riedel", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Carl", "Malone", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Michael", "Jordan", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Bruce", "Wayne", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Jackie", "Chan", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Patrick", "Stewart", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Jennifer", "Weil", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Alejandro", "Martinez", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Bill", "Schmill", new Date("10/11/1950")));

    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));

    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));


    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));

    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));

    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    // this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));

    this.users = Observable.from(this.rawUsers);
    this.ngsmTablepagerTotalNumberOfUsers = this.rawUsers.length;
  }

  ngOnInit() {

    this.ngsmSelectForm = this.formBuilder.group({
      countries: [this.ngsmSelectedCountries]
    });
    this.ngsmAutocompleteForm = this.formBuilder.group({
      selectedStaffId: [this.currentStaff.value]
    });
    this.ngsmDatepickerForm = this.formBuilder.group({
      myDate: [this.ngsmDatepickerSelectedDate]
    });
    this.ngsmTimepickerForm = this.formBuilder.group({
      myTime: [this.ngsmTimepickerSelectedTime]
    });

    this.seedTablePager();
    this.getUsers();

  }

}
