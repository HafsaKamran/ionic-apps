/**
 * HomePage
 *
 * This class is the entry point for the application and allows the user to purchase
 * products/display purchased products
 *
 * @author James Griffiths
 * @date 20/10/2020
 * @version 0.1
 * @export
 * @class HomePage
 * @packageDocumentation
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @ignore
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  /**
   * @public
   * @property happyFamilies
   * @type {boolean}
   * @memberof HomePage
   */
  public happyFamilies 	         = false;


  /**
   * @public
   * @property climateHero
   * @type {boolean}
   * @memberof HomePage
   */
  public climateHero 	           = false;


  /**
   * @public
   * @property alphaMale
   * @type {boolean}
   * @memberof HomePage
   */
  public alphaMale 	             = false;


  /**
   * @public
   * @property grandTheftNoughto
   * @type {boolean}
   * @memberof HomePage
   */
  public grandTheftNoughto 	     = false;


  /**
   * @public
   * @property worldTraveller
   * @type {boolean}
   * @memberof HomePage
   */
  public worldTraveller	         = false;


  /**
   * @public
   * @property kingForADay
   * @type {boolean}
   * @memberof HomePage
   */
  public kingForADay	           = false;


  /**
   * @public
   * @property goTo
   * @type {string}
   * @memberof HomePage
   */
  public goTo: string;


  /**
   * @constructor
   * Creates an instance of HomePage.
   * @param {Router} router
   * @memberof HomePage
   */
  constructor(private router: Router) { }

  /**
   * @private
   * @method determineProductsToEnable
   * @param {Array<any>} data
   * @description      Iterates through the supplied product data and looks for matches. If found, the associated product is
   *                   then enabled within the application so the user can play that game
   * @returns {none}
   * @memberof HomePage
   */
  private determineProductsToEnable(product: string): void {
    switch (product) {
      case 'com.saintsatplay.happyfamilies':
        this.happyFamilies 		= true;
        break;
 
      case 'com.saintsatplay.climatehero':
        this.climateHero 		= true;
        break;
 
      case 'com.saintsatplay.alphamale':
        this.alphaMale 		= true;
        break;
 
      case 'com.saintsatplay.grandtheftnoughto':
        this.grandTheftNoughto 		= true;
        break;
 
      case 'com.saintsatplay.worldtraveller':
        this.worldTraveller 		= true;
        break;
 
      case 'com.saintsatplay.kingforaday':
        this.kingForADay 		= true;
        break;
     }
  }


   /**
    * @public
    * @method playGame
    * @param {string} page
    * @description      Allows the user to navigate to the matched game
    * @returns {none}
    * @memberof HomePage
    */
   public playGame(page: string): void {
    switch (page) {
      case 'AlphaMale':
        this.goTo = 'alpha-male';
        break;

      case 'ClimateHero':
        this.goTo = 'climate-hero';
        break;

      case 'HappyFamilies':
        this.goTo = 'happy-families';
        break;

      case 'GrandTheftNoughto':
        this.goTo = 'grand-theft-noughto';
        break;

      case 'WorldTraveller':
        this.goTo = 'world-traveller';
        break;

      case 'KingForADay':
        this.goTo = 'king-for-a-day';
        break;
    }
    this.router.navigateByUrl('/' + this.goTo);
   }
}
