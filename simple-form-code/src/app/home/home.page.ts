import { Component } from '@angular/core';
import { Details } from '../interfaces/details';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  /**
   * @public
   * @property details
   * @type {Details}
   * @memberof HomePage
   */
  public details: Details = {
    name  	    : 'James Griffiths',
    occupation 	: 'Code Monkey',
    platform 		: 'Other'
 };


 /**
  * @constructor
  * Creates an instance of HomePage.
  * @memberof HomePage
  */
 constructor() { }


 /**
  * @public
  * @method saveDetails
  * @memberof HomePage
  * @returns none
  */
 public saveDetails(): void {
    console.log('Boo');
    console.log(`My name is ${this.details.name}`);
    console.log(`I work as a ${this.details.occupation}`);
    console.log(`My favourite platform is ${this.details.platform}`);
 }

}
