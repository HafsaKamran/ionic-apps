/** 
 * 
 * StorageService
 * 
 * This class provides methods for managing data within the project using the
 * Ionic Storage API
 * @author James Griffiths
 * @date 11/08/2020
 * @version 0.1
 * @export
 * @class StorageService
 * @packageDocumentation
 */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * Creates an instance of StorageService
   * @constructor
   * @param {Storage} storage
   * @memberof StorageService
   */
  constructor(public storage: Storage) { }


  /**
   * @public
   * @async
   * @method init
   * @description     Initialises Ionic Storage and determines whether available or not
   * @returns {Promise<any>}
   * @memberof StorageService
   */
  public async init(): Promise<any> {
    await this.storage.ready()
    .then(() => {
      // console.log('Storage is ready');
      return true;
    })
    .catch((error: any) => {
      return false;
    });
  }


  /**
   * @public
   * @async
   * @method set
   * @param {string} key
   * @param {(Array<any> | string | number | boolean | object)} value
   * @description     Sets a value within Ionic Storage
   * @returns {Promise<any>}
   * @memberof StorageService
   */
  public async set(key: string, value: Array<any> | string | number | boolean | object): Promise<any> {
    // console.log('Set: ' + key + ' | ' + value);
    return await this.storage.set(key, value);
  }


  /**
   * @public
   * @async
   * @method get
   * @param {string} key
   * @description       Retrieves a specific value from Ionic Storage
   * @returns {Promise<any>}
   * @memberof StorageService
   */
  public async get(key: string): Promise<any> {
    return await this.storage.get(key);
  }


  /**
   * @public
   * @async
   * @method remove
   * @param {string} key
   * @description       Removes a specific value from Ionic Storage
   * @returns {Promise<any>}
   * @memberof StorageService
   */
  public async remove(key: string): Promise<any> {
    return await this.storage.remove(key);
  }
}
