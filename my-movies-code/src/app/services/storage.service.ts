/**
 * StorageService
 *
 * Implements custom wrappers for the following Capacitor Storage API methods:
 * 
 * 1. get
 * 2. set
 * 3. keys
 * 
 * @author James Griffiths
 * @date 20/05/2020
 * @version 0.1
 * @export
 * @class StorageService
 * @packageDocumentation
 */
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


/**
 *@ignore
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * @constructor
   * Creates an instance of StorageService.
   * @memberof StorageService
   */
  constructor() { }


  /**
   * @public
   * @async
   * @method get
   * @description   Retrieves JSON parsed data from Ionic Storage for a specified key
   * @param {string} keyName
   * @returns {Promise<any>}
   * @memberof StorageService
   */
  public async get(keyName: string): Promise<any> {
    const data = await Storage.get({ key: keyName });
    return await JSON.parse(data.value);
  }


  /**
   * @public
   * @async
   * @method set
   * @description   Used to store values in Ionic Storage
   * @param {string} keyName
   * @param {string} data
   * @returns {Promise<any>}
   * @memberof StorageService
   */
  public async set(keyName: string, data: string): Promise<any> {
    return await Storage.set({
      key: keyName,
      value: data
    });
  }


  /**
   * @public
   * @async
   * @method keys
   * @description     Returns an array of all existing keys within Ionic Storage
   * @returns {Promise<any>}
   * @memberof StorageService
   */
  public async keys(): Promise<any> {
    return await Storage.keys();
  }

}
