/**
 * ManagerService
 *
 * This class manages where data is loaded from and initialises the Ionic Storage keys with
 * thir rrespective data entries
 *
 * @author James Griffiths
 * @date 29/05/2020
 * @version 0.1
 * @export
 * @class ManagerService
 * @packageDocumentation
 */
import { Injectable } from '@angular/core';
import { PlacesService } from './places.service';
import { StorageService } from './storage.service';
import { Country } from '../interfaces/countries';
import { Location } from '../interfaces/locations';
import { environment } from '../../environments/environment';

/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
export class ManagerService {


  /**
   * @private
   * @property countryKey
   * @type {string}
   * @memberof ManagerService
   */
  private countryKey: string = environment.keys.storage.countries;


  /**
   * @private
   * @property locationsKey
   * @type {string}
   * @memberof ManagerService
   */
  private locationsKey: string = environment.keys.storage.locations;



  /**
   * @constructor
   * Creates an instance of ManagerService.
   * @param {PlacesService} places
   * @param {StorageService} storage
   * @memberof ManagerService
   */
  constructor(private places: PlacesService,
              private storage: StorageService) { }


  /**
   * @public
   * @async
   * @method getCountries
   * @description Returns countries data for the application from Ionic Storage - IF any exists
   *              within Storage.
   *              If NO data is found in Ionic Storage this is retrieved from the PlacesService instead
   *              (and the returned data is subsequently assigned to Ionic Storage for the designated key)
   * @returns {Promise<Array<Country>>}
   * @memberof ManagerService
   */
  public async getCountries(): Promise<Array<Country>> {
    return this.storage
    .get(this.countryKey)
    .then((countriesObj: Array<Country>) => {
      if (countriesObj.length === 0) {
        const countries: Array<Country> = this.places.getCountriesFromJSON();
        this.addToStorage(this.countryKey, countries);
        return countries;
      } else {
        return countriesObj;
      }
    });
  }



  /**
   * @public
   * @async
   * @method getLocations
   * @description Returns store locations data for the application from Ionic Storage - IF any exists
   *              within Storage.
   *              If NO data is found in Ionic Storage this is retrieved from the PlacesService instead
   *              (and the returned data is subsequently assigned to Ionic Storage for the designated key)
   * @returns {Promise<Array<Location>>}
   * @memberof ManagerService
   */
  public async getLocations(): Promise<Array<Location>> {
    return this.storage
    .get(this.locationsKey)
    .then((locationsObj: Array<Location>) => {
      if (locationsObj.length === 0) {
        const locations: Array<Location> = this.places.getLocationsFromJSON();
        this.addToStorage(this.locationsKey, locations);
        return locations;
      } else {
        return locationsObj;
      }
    });

  }


  /**
   * @private
   * @method addToStorage
   * @param {string} key
   * @param {(Array<Country | Location >)} obj
   * @description       Uses the StorageService set method to store the supplied data
   *                    against the supplied key value
   * @memberof ManagerService
   */
  private addToStorage(key: string, obj: Array<Country | Location >) {
    this.storage.set(key, obj);
  }



}
