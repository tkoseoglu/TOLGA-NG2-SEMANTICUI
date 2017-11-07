import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngsm-modal-test',
  templateUrl: './ngsm-modal-test.component.html',
  styleUrls: ['./ngsm-modal-test.component.css']
})
export class NgsmModalTestComponent implements OnInit {

  showModal: boolean = false;
  modalId: string = "myModal";

  constructor() { }

  toggleModal() {
    if (this.showModal)
      this.showModal = false;
    else
      this.showModal = true;
  }

  ngOnInit() {
  }

}
