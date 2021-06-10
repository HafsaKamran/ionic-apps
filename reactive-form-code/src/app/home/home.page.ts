import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  /**
   * @public
   * @property form
   * @type {FormGroup}
   * @memberof HomePage
   */
  public form: FormGroup;


   /**
    * @public
    * @property name
    * @type {*}
    * @memberof HomePage
    */
   public name: any;


   /**
    * @constructor
    * Creates an instance of HomePage.
    * @param {FormBuilder} fb
    * @memberof HomePage
    */
   constructor(public fb: FormBuilder) {
      this.form 		= fb.group({
        name 		: ['', [Validators.required, Validators.minLength(4)]],
        email		: ['', [Validators.required, Validators.email]],
        platform 	: ['', Validators.required]
      });

      this.name 		= this.form.get('name'); 

      this.name
      .valueChanges
      .subscribe((value: string) => {
         console.log(`Entered name is ${value}`);
      });

   }


   /**
    * @public
    * @method saveDetails
    * @param {*} value
    * @description  Logs the form data to the console
    * @returns {none}
    * @memberof HomePage
    */
   public saveDetails(value: any): void {
      console.dir(value);
   }

}
