import { Component, OnChanges, Input } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'ngsm-modal',
  templateUrl: './ngsm-modal.component.html',
  styleUrls: ['./ngsm-modal.component.css']
})
export class NgsmModalComponent implements OnChanges {

  @Input()
  id: string;

  @Input()
  show: boolean = false;

  showSub: Subscription;

  constructor() { }

  showModal() {
    (<any>$(`#${this.id}`)).modal('show');
  }

  hideModal() {
    (<any>$(`#${this.id}`)).modal('hide');
  }

  ngOnChanges() {
    if (this.id) {
      setTimeout(function () {
        (<any>$(`#${this.id}`)).modal({
          observeChanges: true
        });
      }, 200);
    }

    if (this.show) this.showModal();
    else this.hideModal();
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {

  }

}
