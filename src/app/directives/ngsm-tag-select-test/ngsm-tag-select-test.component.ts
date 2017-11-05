import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgsmAppService } from '../../ngsm.app.service';

@Component({
  selector: 'ngsm-tag-select-test',
  templateUrl: './ngsm-tag-select-test.component.html',
  styleUrls: ['./ngsm-tag-select-test.component.css']
})
export class NgsmTagSelectTestComponent implements OnInit {

  myTagSelect: string = "myTagSelect";
  ngsmTagSelectRemoteUrl: string = `http://${this.appService.webServerUrl}/api/util/autocompleteLocation`;
  ngsmTagSelectUsage: string = "Usage...";
  ngsmTagSelectDefaultText = new EventEmitter<string>();

  tags = [];

  constructor(private appService: NgsmAppService) { }

  getTags() {
    this.tags = [{
      id: 1,
      text: 'New Mexico'
    }, {
      id: 2,
      text: 'Texas'
    }];
  }

  ngOnInit() {


    let self = this;
    setTimeout(function () {
      self.ngsmTagSelectDefaultText.emit("Type to find Locations");      
      self.getTags();
    }, 100);

    setTimeout(function () {
      //self.getTags();
    }, 200);

  }

}
