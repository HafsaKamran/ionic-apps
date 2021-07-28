/**
 * PlacesService
 *
 * This class manages the loading and supply of data from their respective JSON files
 *
 * @author James Griffiths
 * @date 29/05/2020
 * @version 0.1
 * @export
 * @class PlacesService
 * @packageDocumentation
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/countries';
import { Location } from '../interfaces/locations';
import { map } from 'rxjs/operators';


/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
export class PlacesService {


  /**
   * @private
   * @type {string}
   * @property countriesUri
   * @memberof PlacesService
   */
  private countriesUri = 'assets/countries.json';


  /**
   * @private
   * @type {string}
   * @property locationsUri
   * @memberof PlacesService
   */
  private locationsUri = 'assets/locations.json';


  /**
   * @private
   * @property countries
   * @type {Array<Country>}
   * @memberof PlacesService
   */
  private countries: Array<Country> 		=	[];


  /**
   * @private
   * @property locations
   * @type {Array<Location>}
   * @memberof PlacesService
   */
  private locations: Array<Location> 		=	[];


  /**
   * @constructor
   * Creates an instance of PlacesService.
   * @param {HttpClient} http
   * @memberof PlacesService
   */
  constructor(private http: HttpClient) { }


  /**
   * @public
   * @method loadCountries
   * @description		Converts countries array into an Observable and returns that for
   *                the HomePage component to subscribe to
   * @returns {none}
   * @memberof PlacesService
   */
  public loadCountries(): void {
    this.http
    .get<Array<Country>>(this.countriesUri)
    .pipe(
      map((data: Array<Country>) => {
        data.forEach((country: Country) => {
          this.countries.push({
            id	      : country.id,
            country	  : country.country,
            lat		    : country.lat,
            lng		    : country.lng,
            zoom		  : country.zoom,
            active	  : country.active
          });
        });
      })
      ).subscribe();
  }


  /**
   * @public
   * @method getCountriesFromJSON
   * @descrription        Return parsed Countries data
   * @return {Array}
   * @memberof PlacesService
   */
  public getCountriesFromJSON(): Array<Country> {
      return this.countries;
  }


  /**
   * @public
   * @method loadLocations
   * @description		Converts locations array into an Observable and returns that for
   *                the HomePage component to subscribe to
   * @returns {none}
   * @memberof PlacesService
   */
  public loadLocations(): void {
    this.http
    .get<Array<Location>>(this.locationsUri)
    .pipe(
      map((data: Array<Location>) => {
        data.forEach((location: Location) => {
          this.locations.push({
            id			: location.id,
            country	: location.country,
            name		: location.name,
            address	: location.address,
            lat			: location.lat,
            lng			: location.lng,
            zoom		: location.zoom,
            active	: location.active
          });
        });
      })
    ).subscribe();
  }


  /**
   * @public
   * @method getLocationsFromJSON
   * @description     Return parsed Locations data
   * @return {Array<Location>}
   * @memberof PlacesService
   */
  public getLocationsFromJSON(): Array<Location> {
    return this.locations;
}

}
