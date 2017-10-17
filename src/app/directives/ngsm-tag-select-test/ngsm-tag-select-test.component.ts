import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgsmAppService } from '../../ngsm.app.service';

@Component({
  selector: 'ngsm-tag-select-test',
  templateUrl: './ngsm-tag-select-test.component.html',
  styleUrls: ['./ngsm-tag-select-test.component.css']
})
export class NgsmTagSelectTestComponent implements OnInit {

  myTagSelect: string = "myTagSelect";
  ngsmTagSelectRemoteUrl: string = `http://${this.appService.webServerUrl}/api/util/autocompleteAdGroup`;
  ngsmTagSelectUsage: string = "Usage...";
  ngsmTagSelectDefaultText = new EventEmitter<string>();

  constructor(private appService: NgsmAppService) { }

  ngOnInit() {

    var self = this;
    setTimeout(function () {      
      self.ngsmTagSelectDefaultText.emit("Type to find Groups");
    }, 250);

  }

}
