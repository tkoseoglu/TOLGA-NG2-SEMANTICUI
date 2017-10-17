import { Component, OnInit, EventEmitter } from '@angular/core';


import 'rxjs/add/operator/skip';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent implements OnInit {
  
  private mockInterval: any;
  private mockInterval2: any;
  
  
  constructor() { }

    
  scrollTo(elementId: string) {
    let scrollTop = ($(`#${elementId}`).offset().top) - 70;
    console.log(scrollTop);
    $("html,body").animate({
      scrollTop: scrollTop
    }, 500);
  }
   
  ngOnInit() {
          
  }

}
