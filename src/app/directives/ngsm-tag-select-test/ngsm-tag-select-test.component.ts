import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgsmAppService } from '../../ngsm.app.service';

@Component({
  selector: 'ngsm-tag-select-test',
  templateUrl: './ngsm-tag-select-test.component.html',
  styleUrls: ['./ngsm-tag-select-test.component.css']
})
export class NgsmTagSelectTestComponent implements OnInit {

  ngsmTagSelectRemoteUrl1: string = `http://${this.appService.webServerUrl}/api/util/autocompleteKeyword`;

  ngsmTagSelectDefaultText1 = new EventEmitter<string>();
  ngsmTagSelectDefaultText2 = new EventEmitter<string>();

  keywords = [];
  
  constructor(private appService: NgsmAppService) { }

  getKeywords() {
    this.keywords = [{
      id: 1,
      text: 'Location 1'
    }, {
      id: 2,
      text: 'Location 2'
    }];
  }
 
  ngOnInit() {


    let self = this;
    setTimeout(function () {
      self.ngsmTagSelectDefaultText1.emit("Type to find keywords");
      //self.ngsmTagSelectDefaultText2.emit("Type to find Partners");
      //self.getLocations();
      //self.getPartners();
    }, 200);

    setTimeout(function () {
      //self.getTags();
    }, 200);

  }

}
