/**
 * NutrientsService
 *
 * This class provides methods for performing the following queries using the Spoonacular API:
 * 
 * 1. Recipes - Find by nutrients
 * 2. Recipes - Random
 *
 * @author James Griffiths
 * @date 06/06/2020
 * @version 0.1
 * @export
 * @class NutrientsService
 * @packageDocumentation
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
export class NutrientsService {


  /**
   * @private
   * @property apiKey
   * @type {string}
   * @memberof NutrientsService
   */
  private apiKey = environment.keys.api.spoonacular;


  /**
   * @private
   * @property nutrients
   * @type {string}
   * @memberof NutrientsService
   */
  private nutrients = 'https://api.spoonacular.com/recipes/findByNutrients?';


  /**
   * @private
   * @property random
   * @type {string}
   * @memberof NutrientsService
   */
  private random = 'https://api.spoonacular.com/recipes/random?number=10&tags=vegetarian,dessert';


  /**
   * Creates an instance of NutrientsService.
   * @param {HttpClient} http
   * @memberof NutrientsService
   */
  constructor(private http: HttpClient) { }


  /**
   * @public
   * @method getRecipesBySpecifiedNutrients
   * @param {string} query
   * @description   Calls the findByNutrients spoonacular API method and returns the result as an observable
   * @returns {Observable<any>}
   * @memberof NutrientsService
   */
  public getRecipesBySpecifiedNutrients(query: string): Observable<any> {
    return this.http.get(this.nutrients + query + '&apiKey=' + this.apiKey);
  }


  /**
   * @public
   * @method getRandomRecipes
   * @param {string} query
   * @description   Calls the random spoonacular API method and returns the result as an observable
   * @returns {Observable<any>}
   * @memberof NutrientsService
   */
  public getRandomRecipes(): Observable<any> {
    return this.http.get(this.random + '&apiKey=' + this.apiKey);
  }


}
