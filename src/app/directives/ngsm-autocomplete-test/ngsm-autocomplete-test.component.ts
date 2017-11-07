import { Component, OnInit, EventEmitter } from '@angular/core';

import { NgsmAppService } from '../../ngsm.app.service';

@Component({
  selector: 'ngsm-autocomplete-test',
  templateUrl: './ngsm-autocomplete-test.component.html',
  styleUrls: ['./ngsm-autocomplete-test.component.css']
})
export class NgsmAutocompleteTestComponent implements OnInit {

  ngsmAutocompleteUrl: string = `http://${this.appService.webServerUrl}/api/util/autocompleteStaff`;
  ngsmAutocompleteDefaultText = new EventEmitter<string>();

  selectedStaffId: number;

  constructor(private appService: NgsmAppService) { }

  ngOnInit() {

    let self = this;
    setTimeout(function () {
      self.ngsmAutocompleteDefaultText.emit("Type to find something...");
    }, 250);

  }

}
