import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'ngsm-loader',
  templateUrl: './ngsm-loader.component.html',
  styleUrls: ['./ngsm-loader.component.css']
})
export class NgsmLoaderComponent implements OnInit {

  @Input()
  showWhen: boolean;

  @Input()
  isInverted: boolean = true;
 
  @Input()
  message: string = "";

  constructor() { }

  ngOnInit() {
  }

}
