import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngsm-datepicker-test',
  templateUrl: './ngsm-datepicker-test.component.html',
  styleUrls: ['./ngsm-datepicker-test.component.css']
})
export class NgsmDatepickerTestComponent implements OnInit {


  ngsmDatepickerSelectedDate = moment().format("MMMM DD, YYYY");
  ngsmDatepickerUsage: string = "<ngsm-datepicker id=\"\" formControlName=\"\" hint=\"\"></ngsm-datepicker>";

  constructor() { }

  ngOnInit() {
  }

}
