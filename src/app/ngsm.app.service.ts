import { Injectable } from '@angular/core';

@Injectable()
export class NgsmAppService {

  constructor() { }

  public log(component: string, content: string) {    
    console.log('%c%s: %c%s', 'color: red;', `${component}`, 'color: blue;', `${content}`);
  }

}
