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
 
  setKeywords(id: number) {
    if (id === 1) {
      this.keywords = [{
        id: 111,
        text: 'Home'
      }, {
        id: 222,
        text: 'Auto'
      }];
    }
    else {
      this.keywords = [{
        id: 333,
        text: 'Work'
      }, {
        id: 444,
        text: 'Money'
      }];
    }
  }

  ngOnInit() {
    let self = this;
    setTimeout(function () {
      self.ngsmTagSelectDefaultText1.emit("Type to find keywords");      
    }, 200);   
  }

}
