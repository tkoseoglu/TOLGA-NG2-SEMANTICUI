import { Component, OnInit, EventEmitter } from '@angular/core';

import { NgsmAppService } from '../../ngsm.app.service';

@Component({
  selector: 'ngsm-autocomplete-test',
  templateUrl: './ngsm-autocomplete-test.component.html',
  styleUrls: ['./ngsm-autocomplete-test.component.css']
})
export class NgsmAutocompleteTestComponent implements OnInit {

  ngsmAutocompleteUsage: string = " <ngsm-autocomplete id=\"\" formControlName=\"\" url=\"\" defaultText=\"\"></ngsm-autocomplete>";
  myAutocomplete: string = "staffAutocomplete";
  ngsmAutocompleteUrl: string = `http://${this.appService.webServerUrl}/api/util/autocompleteStaff`;
  ngsmAutocompleteDefaultText = new EventEmitter<string>();

  constructor(private appService: NgsmAppService) { }

  ngOnInit() {

    var self = this;
    setTimeout(function () {
      self.ngsmAutocompleteDefaultText.emit("Type to find Staff");      
    }, 250);

  }

}
