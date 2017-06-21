import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageSize } from '../ngsm-tablepager/tablepager.pagesize';

@Component({
  selector: 'ngsm-tablepager',
  templateUrl: './ngsm-tablepager.component.html',
  styleUrls: ['./ngsm-tablepager.component.css']
})
export class NgsmTablepagerComponent implements OnChanges {

  @Input()
  totalNumberOfRecords: number = 0;

  @Input()
  selectedPageSize: number = 10;

  @Input()
  selectedPage: number = 0;

  numberOfPagesDisplayed = 5;
  totalNumberOfPages: number = 0;
  pageSizes: any[] = [{
    title: "10 Records",
    value: 10
  }, {
    title: "25 Records",
    value: 25
  }, {
    title: "50 Records",
    value: 50
  }, {
    title: "100 Records",
    value: 100
  }];

  @Output()
  onPageSizeChange: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  onPageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnChanges(changes) {
    this.totalNumberOfPages = Math.ceil(this.totalNumberOfRecords / this.selectedPageSize);
  }

  setPage(page) {
    console.log("New Page %s", page);
    this.selectedPage = page;
    if (this.selectedPage < 0) this.selectedPage = 0;
    if (this.selectedPage >= this.totalNumberOfPages) this.selectedPage = this.totalNumberOfPages;
    this.onPageChange.emit(this.selectedPage);
  }

  setPageSize(pageSize) {
    this.selectedPageSize = pageSize;
    console.log("New Page Size %s", pageSize);
    this.totalNumberOfPages = Math.ceil(this.totalNumberOfRecords / this.selectedPageSize);
    this.onPageSizeChange.emit(pageSize);
  }

  range() {
    if (this.totalNumberOfPages === 0) return;
    var start = this.selectedPage - 2;

    if (start < 0)
      start = 0;

    var end = start + this.numberOfPagesDisplayed;
    if (end > this.totalNumberOfPages) {
      end = this.totalNumberOfPages;
      start = end - this.numberOfPagesDisplayed;
    }

    if (start > end) return;

    var ret = [];
    for (var i = start; i !== end; ++i) {
      ret.push(i);
    }
    return ret;
  }

}
