/**
 * DistancesService
 *
 * This class manages calculating the distances between a person's supplied location and 
 * the supplied reference location
 *
 * @author James Griffiths
 * @date 29/05/2020
 * @version 0.1
 * @export
 * @class DistancesService
 * @packageDocumentation
 */
import { Injectable } from '@angular/core';


/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
export class DistancesService {


  /**
   * @constructor
   * Creates an instance of DistancesService.
   * @memberof DistancesService
   */
  constructor() { }


  /**
   * @public
   * @method convertDegreesToRadians
   * @param {number}  degree      The degree value to be converted into radians
   * @description       Convert degrees into radians
   * @return {number}
   * @memberof DistancesService
   */
  public convertDegreesToRadians(degree: number): number {
    return degree * (Math.PI / 180);
  }


  /**
   * @public
   * @method calculateDistanceInKilometres
   * @param {number}  latitudeOne      The user's current latitude
   * @param {number}  longitudeOne     The user's current longitude
   * @param {number}  latitudeTwo      The latitude of an Apple Store location
   * @param {number}  longitudeTwo     The longitude of an Apple Store location
   * @description     Calculates distance between user's current location and nearest Apple store
   * @return {number}
   * @memberof DistancesService
   */
  public calculateDistanceInKilometres(latitudeOne: number,
                                       longitudeOne: number,
                                       latitudeTwo: number,
                                       longitudeTwo: number): number {
    const radiusOfEarth 		= 6371, // Radius of the earth in km
          degreesLat			  = this.convertDegreesToRadians(latitudeTwo - latitudeOne),
          degreesLon			  = this.convertDegreesToRadians(longitudeTwo - longitudeOne),
          calculationOne  	= Math.sin(degreesLat / 2) * Math.sin(degreesLat / 2),
          calculationTwo  	= Math.cos(this.convertDegreesToRadians(latitudeOne)) * Math.cos(this.convertDegreesToRadians(latitudeTwo)),
          calculationThree	= Math.sin(degreesLon / 2) * Math.sin(degreesLon / 2),
          sumTotal 			    = calculationOne + calculationTwo * calculationThree,
          finalSum			    = 2 * Math.atan2(Math.sqrt(sumTotal), Math.sqrt(1 - sumTotal)),
          actualDistance		= radiusOfEarth * finalSum;

    return actualDistance;
  }


}
