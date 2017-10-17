import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngsm-timepicker-test',
  templateUrl: './ngsm-timepicker-test.component.html',
  styleUrls: ['./ngsm-timepicker-test.component.css']
})
export class NgsmTimepickerTestComponent implements OnInit {

  ngsmTimepickerSelectedTime = moment().format("HH mm");
  ngsmTimepickerUsage: string = "<ngsm-timepicker id=\"\" formControlName=\"\" hint=\"\"></ngsm-timepicker>";

  constructor() { }

  ngOnInit() {
  }

}
