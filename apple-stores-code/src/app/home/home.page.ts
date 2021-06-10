import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../services/places.service';
import { forkJoin, Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Country } from '../interfaces/country';
import { Location } from '../interfaces/location';
import { Store } from '../interfaces/store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


   /**
    * @public
    * @property values$
    * @type {Observable<any>}
    * @memberof HomePage
    */
   public values$: Observable<any>;



   /**
    * Creates an instance of HomePage.
    * @param { PlacesService} places
    * @memberof HomePage
    */
   constructor(public places: PlacesService) { }


   /**
    * @method ngOnInit
    * @description     Angular lifecycle hook to run logic on component initialisation
    * @memberof HomePage
    */
   ngOnInit() {
    this.loadAndParsePlaces();
   }


   /**
    * @private
    * @method loadPlaces
    * @memberof HomePage
    * @returns none
    */
   private loadAndParsePlaces(): void {
    console.time('Loading Apple Store Locations');
    this.values$ = forkJoin(
      this.places.loadLocations(),
      this.places.loadCountries()
    ).pipe(
      delay(500),
      map(([first, second]) => {
        console.time('Combining Countries & Locations');
        const arr  = [];
        // tslint:disable-next-line:max-line-length
        first.forEach((location: Location) => {
          second.forEach((country: Country) => {
            if (country.id === location.country) {
                console.log(`Country:${country.country}`);
                arr.push({
                  name: 		location.name,
                  address: 	location.address,
                  country: 	country.country,
                  lat: 			location.lat,
                  lng: 			location.lng,
                  zoom: 		location.zoom,
                  active:		location.active
                });
                console.count();
            }
          });
        });
        return arr;
      }),
      tap((data: Array<Store>) => {
        this.renderDataToTable(data);
        this.renderDataToConsole('Apple Stores & countries', data);
        console.timeEnd('Combining Countries & Locations');
        return data;
      })
    );
   }


   /**
    * @private
    * @method renderDataToTable
    * @description        Render parsed array of Apple store locations data to tabular data format
    *                     whgich is subsequently printed the browser console
    * @param {Array<Store>} stores
    * @memberof HomePage
    * @returns none
    */
   private renderDataToTable(stores: Array<Store>): void {
      console.log('Rendering to Table format');
      console.table(stores);
   }


   /**
    * @private
    * @method renderDataToConsole
    * @description    Takes the parsed array of Apple store locations and 'dumps' these
    *                 to the browser console
    * @param {string} name
    * @param {Array<Store>} values
    * @memberof HomePage
    * @returns none
    */
   private renderDataToConsole(name: string, values: Array<Store>): void {
      console.log(`Begin output for ${name}`);
      console.dir(values);
      console.log(`End output for ${name}`);
   }

}
