import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgsmAppService } from '../../ngsm.app.service';

@Component({
  selector: 'ngsm-tag-select-test',
  templateUrl: './ngsm-tag-select-test.component.html',
  styleUrls: ['./ngsm-tag-select-test.component.css']
})
export class NgsmTagSelectTestComponent implements OnInit {

  ngsmTagSelectRemoteUrl1: string = `http://${this.appService.webServerUrl}/api/util/autocompleteLocation`;
  ngsmTagSelectRemoteUrl2: string = `http://${this.appService.webServerUrl}/api/util/autocompletePartner`;
  ngsmTagSelectUsage: string = "Usage...";
  ngsmTagSelectDefaultText1 = new EventEmitter<string>();
  ngsmTagSelectDefaultText2 = new EventEmitter<string>();

  locations = [];
  partners = [];

  constructor(private appService: NgsmAppService) { }

  getLocations() {
    this.locations = [{
      id: 1,
      text: 'Location 1'
    }, {
      id: 2,
      text: 'Location 2'
    }];
  }

  getPartners() {
    this.partners = [{
      id: 1,
      text: 'Partner 1'
    }, {
      id: 2,
      text: 'Partner 2'
    }];
  }

  ngOnInit() {


    let self = this;
    setTimeout(function () {
      //self.ngsmTagSelectDefaultText1.emit("Type to find Locations");
      //self.ngsmTagSelectDefaultText2.emit("Type to find Partners");
      self.getLocations();
      self.getPartners();
    }, 200);

    setTimeout(function () {
      //self.getTags();
    }, 200);

  }

}
