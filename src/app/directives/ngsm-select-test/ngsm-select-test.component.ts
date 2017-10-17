import { Component, OnInit } from '@angular/core';

import { NgsmAppService } from '../../ngsm.app.service';

@Component({
  selector: 'ngsm-select-test',
  templateUrl: './ngsm-select-test.component.html',
  styleUrls: ['./ngsm-select-test.component.css']
})
export class NgsmSelectTestComponent implements OnInit {

  ngsmMultiselectSelectedItems = [];
  ngsmMultiselectUrl: string = `http://${this.appService.webServerUrl}/api/util/autocompleteStaff`;
  ngsmSelectUsage: string = "<ngsm-select id=\"\" formControlName=\"\" url=\"\" selectedItems=\"\" defaultText=\"\"></ngsm-select>";


  constructor(private appService: NgsmAppService) { }


  ngOnInit() {

    this.ngsmMultiselectSelectedItems = [{
      value: 9425,
      name: "demo apply tv ipad"
    }, {
      value: 11980,
      name: "Server"
    }];

    let selectedIds = this.ngsmMultiselectSelectedItems.map(function (a) {
      return a.value;
    });

    //this.ngsmSelectForm.controls["selectedStaffIds"].setValue(selectedIds);

  }

}
