import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  /**
   * @constructor
   * Creates an instance of HomePage.
   * @memberof HomePage
   */
  constructor() {}


  /**
   * @public
   * @method saveDetails
   * @param {*} value
   * @memberof HomePage
   * @returns none
   */
  public saveDetails(value: any): void {
    console.dir(value);
  }

}
