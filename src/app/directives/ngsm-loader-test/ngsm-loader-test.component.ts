import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngsm-loader-test',
  templateUrl: './ngsm-loader-test.component.html',
  styleUrls: ['./ngsm-loader-test.component.css']
})
export class NgsmLoaderTestComponent implements OnInit {

  ngsmLoaderShow: boolean = true;
  ngsmLoaderIsInverted: boolean = true;
  ngsmLoaderMessage: string = "My Loading Message...";
  ngsmLoaderUsage: string = "<ngsm-loader [showWhen]=\"\" [isInverted]=\"\" [message]=\"\"></ngsm-loader>";

  constructor() { }

  toggleLoader() {
    this.ngsmLoaderShow = !this.ngsmLoaderShow;
  }

  ngOnInit() {
  }

}
