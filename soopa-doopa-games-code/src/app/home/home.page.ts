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
import { Platform } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { UtilitiesService } from '../services/utilities.service';
import { Router } from '@angular/router';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';

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
   * @public
   * @property products
   * @type {Array<string>}
   * @memberof HomePage
   */
  public products: Array<string> = [
                                  'com.saintsatplay.happyfamilies',
                                  'com.saintsatplay.climatehero',
                                  'com.saintsatplay.alphamale',
                                  'com.saintsatplay.grandtheftnoughto',
                                  'com.saintsatplay.worldtraveller',
                                  'com.saintsatplay.kingforaday'
                                ];


  /**
   * @constructor
   * Creates an instance of HomePage.
   * @param {AlertController} alert
   * @param {DatabaseService} database
   * @param {LoadingController} loading
   * @param {InAppPurchase} purchase
   * @param {Platform} platform
   * @param {Router} router
   * @memberof HomePage
   */
  constructor(private database: DatabaseService,
              private utilities: UtilitiesService,
              private purchase: InAppPurchase,
              private platform: Platform,
              private router: Router) {
    this.platform
    .ready()
    .then(() => {
      this.database.createDatabase();
      this.initiateProductCheckAndParsing();
    });
  }


  /**
   * @private
   * @method initiateProductCheckAndParsing
   * @description     Retrieves all existing products (if any) that match the supplied array items
   * @returns {none}
   * @memberof HomePage
   */
  private initiateProductCheckAndParsing(): void {
    this.platform
    .ready()
    .then(() => {
        this.utilities.displayPreloader();

        this.purchase
        .getProducts(this.products)
        .then((products: any) => {
          this.retrievePurchases();
        })
        .catch((error: any) => {
          this.utilities.hidePreloader();
          this.utilities
          .displayAlert('Network error', 
                        error.errorMessage + '.<br><br>Please double check your network connection and try again');
        });
    });
   }


   /**
    * @private
    * @method retrievePurchases
    * @description  Retrieves ALL existing products from the SQLite database - if any exist - and determines which
    *               of those products will be enabled within the application
    * @returns {none}
    * @memberof HomePage
    */
   private retrievePurchases(): void {
    this.database.retrievePurchases()
    .then((data: Array<any>) => {
        this.utilities.hidePreloader();
        this.determineProductsToEnable(data);
    })
    .catch(function(error: any) {
        this.utilities.hidePreloader();
        this.utilities.displayAlert('Retrieving Saved purchases', error);
    });
   }


   /**
    * @private
    * @method determineProductsToEnable
    * @param {Array<any>} data
    * @description      Iterates through the supplied product data and looks for matches. If found, the associated product is
    *                   then enabled within the application so the user can play that game
    * @returns {none}
    * @memberof HomePage
    */
   private determineProductsToEnable(data: Array<any>): void {
    this.platform
    .ready()
    .then(() => {
        data.map((product: any) => {
          this.database.doesPurchaseExistInTable(product.productId);

          switch (product.productId) {

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
        });
    });
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


   /**
    * @public
    * @purchaseProduct
    * @param {string} product
    * @description    Allows a product to be purchased and, if transaction was successful,
    *                 subsequently saved to the SQLite database
    * @returns {none}
    * @memberof HomePage
    */
   public purchaseProduct(product: string): void {
      this.platform
      .ready()
      .then(() => {
         const productID: string	   	      =	product;
         const purchasedItem: Array<any>    =	[{ productId : productID}];

         this.utilities.displayPreloader();

         this.purchase
         .buy(productID)
         .then((data: any) => {
            this.utilities.hidePreloader();
            this.determineProductsToEnable(purchasedItem);
         })
         .catch((err) => {
            this.utilities.hidePreloader();
         });
      });
   }


   /**
    * @public
    * @method restoreProductListings
    * @description      Re-enables ALL purchased products
    * @returns {none}
    * @memberof HomePage
    */
   public restoreProductListings(): void {
      this.platform
      .ready()
      .then(() => {
         this.utilities.displayPreloader();
         this.purchase
         .restorePurchases()
         .then((data) => {
            this.utilities.hidePreloader();
            this.determineProductsToEnable(data);
         })
         .catch((err) => {
            this.utilities.hidePreloader();
            console.log(err);
         });
      });
   }


}
