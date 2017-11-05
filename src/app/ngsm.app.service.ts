import { Injectable } from '@angular/core';

@Injectable()
export class NgsmAppService {

  //webServerUrl = "localhost:50199";
  webServerUrl = "localhost:12345";

  constructor() { }

  public log(component: string, content: string) {
    console.log('%c%s: %c%s', 'color: red;', `${component}`, 'color: blue;', `${content}`);
  }

}
