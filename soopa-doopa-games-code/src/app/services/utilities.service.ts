/**
 * UtilitiesService
 *
 * This class provides utility functions that are used within the application such as
 *
 * 1. Manipulating numbers
 * 2. Date generation/manipulation
 * 3. Displaying loading events
 * 4. Displaying alert messages
 *
 * @author James Griffiths
 * @date 20/10/2020
 * @version 0.1
 * @export
 * @class UtilitiesService
 * @packageDocumentation
 */
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';


/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {


  /**
   * @private
   * @property loader
   * @type {*}
   * @memberof UtilitiesService
   */
  private loader: any;


  /**
   * @constructor
   * Creates an instance of UtilitiesService.
   * @param {AlertController} alert
   * @param {LoadingController} loading
   * @memberof UtilitiesService
   */
  constructor(private alert: AlertController,
              private loading: LoadingController) { }


  /**
   * @public
   * @method prefixWithZeros
   * @param {*} val
   * @description    Prefixes a supplied numeric value with a zero value if the supplied
   *                 number is less than 10
   * @returns {(string | number)}
   * @memberof UtilitiesService
   */
  public prefixWithZeros(val: number): string | number {
    let num: string | number = val;
    if (num < 10) {
      num = '0' + num;
    }
    return num;
  }


  /**
   * @public
   * @method generateDate
   * @description   Generates the current date and time
   * @returns {string}
   * @memberof UtilitiesService
   */
  public generateDate(): string {
    const currDate    =   new Date();
    const year    		=   currDate.getFullYear();
    const month     	=   this.prefixWithZeros(currDate.getMonth());
    const day     		=   this.prefixWithZeros(currDate.getDay());
    const hour    		=   this.prefixWithZeros(currDate.getHours());
    const mins    		=   this.prefixWithZeros(currDate.getMinutes());
    const secs    		=   this.prefixWithZeros(currDate.getSeconds());
    const dateIs      =   year + '-' + month + '-' + day + ' ' + hour + ':' + mins + ':' + secs;
    return dateIs;
  }


  /**
   * @public
   * @method generateTimestamp
   * @description     Generates a timestamp value
   * @returns {number}
   * @memberof UtilitiesService
   */
  public generateTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  }


  /**
   * @public
   * @async
   * @method displayPreloader
   * @description     Uses the Ionic LoadingController module to indicate a time-based event
   *                  is taking place
   * @returns {Promise<any>}
   * @memberof UtilitiesService
   */
  public async displayPreloader(): Promise<any> {
     this.loader = await this.loading.create({
        message: 'Please wait..'
     });

     return await this.loader.present();
  }


  /**
   * @public
   * @method hidePreloader
   * @description       Dismisses a currently active Ionic LoadingController instance
   * @returns {none}
   * @memberof UtilitiesService
   */
  public hidePreloader(): void {
     this.loader.dismissAll();
  }


  /**
   * @public
   * @async
   * @method displayAlert
   * @param {string} title
   * @param {string} message
   * @description   Uses the Ionic AlertController module to display a message to the user
   * @returns {Promise<any>}
   * @memberof UtilitiesService
   */
  public async displayAlert(title: string,
                            message: string): Promise<any> {
   const headsUp 	= await this.alert.create({
     header 	  : title,
     subHeader : message,
     buttons 	: ['Got It!']
   });
   await headsUp.present();
 }

}
