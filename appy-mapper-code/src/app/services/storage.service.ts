/**
 * StorageService
 *
 * This class manages data persistence within the application using select methods from
 * the Ionic Storage API
 *
 * @author James Griffiths
 * @date 29/05/2020
 * @version 0.1
 * @export
 * @class StorageService
 * @packageDocumentation
 */
import { Injectable, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage-angular';


/**
 * @ignore
 */
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
  constructor(public storage: Storage) {
    this.init();
  }


  /**
   * @public
   * @async
   * @method init
   * @description     Initialises Ionic Storage and determines whether available or not
   * @returns {Promise<any>}
   * @memberof StorageService
   */
  public async init(): Promise<any> {
    await this.storage.create()
    .then(() => {
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
