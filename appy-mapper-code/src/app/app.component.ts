/**
 * AppComponent
 *
 * This class bootstraps the application
 *
 * @author James Griffiths
 * @date 29/05/2020
 * @version 0.1
 * @export
 * @class AppComponent
 * @packageDocumentation
 */
 import { Component } from '@angular/core';
 import { Platform } from '@ionic/angular';
 import { SplashScreen } from '@ionic-native/splash-screen/ngx';
 import { StatusBar } from '@ionic-native/status-bar/ngx';
 import { PlacesService } from './services/places.service';
 
 /**
  * @ignore
  */
 @Component({
   selector: 'app-root',
   templateUrl: 'app.component.html',
   styleUrls: ['app.component.scss']
 })
 export class AppComponent {
 
 
   /**
    * @constructor
    * Creates an instance of AppComponent.
    * @param {Platform} platform
    * @param {SplashScreen} splashScreen
    * @param {StatusBar} statusBar
    * @param {PlacesService} places
    * @memberof AppComponent
    */
   constructor(private platform: Platform,
               private splashScreen: SplashScreen,
               private statusBar: StatusBar,
               private places: PlacesService) {
     this.initializeApp();
   }
 
 
   /**
    * @public
    * @method initializeApp
    * @description     Bootstraps the application - here we load the countries and locations
    *                  data courtesy of the PlacesService
    * @returns {none}
    * @memberof AppComponent
    */
   public initializeApp(): void {
     this.platform
     .ready()
     .then(() => {
       this.statusBar.styleDefault();
       this.splashScreen.hide();
       this.places.loadCountries();
       this.places.loadLocations();
     });
   }
 }
 