/**
 * HomePage
 *
 * This class manages the rendering of data and map related functionality that
 * is displayed to the end user
 *
 * @author James Griffiths
 * @date 29/05/2020
 * @version 0.1
 * @export
 * @class HomePage
 * @packageDocumentation
 */
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { ManagerService } from '../services/manager.service';
import { DistancesService } from '../services/distances.service';
import { from, of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Country } from '../interfaces/countries';
import { Location } from '../interfaces/locations';
import { icon, latLng, Layer, marker, tileLayer } from 'leaflet';
import { environment } from '../../environments/environment';
import { Geolocation } from '@capacitor/geolocation';

/**
 * @ignore
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {


  /**
   * @public
   * @property countries$
   * @type {Observable<Array<Country>>}
   * @memberof HomePage
   */
  public countries$: Observable<Array<Country>>;


  /**
   * @public
   * @property locations$
   * @type {Observable<Array<Location>>}
   * @memberof HomePage
   */
  public locations$: Observable<Array<Location>>;


   /**
    * @public
    * @property stores
    * @type {Array<any>}
    * @memberof HomePage
    */
   public stores: Array<any>;


   /**
    * @public
    * @property stores
    * @type {Observable<Array<Store>>}
    * @memberof HomePage
    */
   public countryData: Array<any>;


   /**
    * @public
    * @property locationsPresent
    * @type {boolean}
    * @memberof HomePage
    */
   public locationsPresent	  = true;


   /**
    * @public
    * @property markers
    * @type {Layer}
    * @memberof HomePage
    */
   public markers: Layer[]		= [];


   /**
    * @public
    * @property byCountry
    * @type {string}
    * @memberof HomePage
    */
   public byCountry: string;


   /**
    * @public
    * @property byNearest
    * @type {any}
    * @memberof HomePage
    */
   public byNearest: any;


   /**
    * @public
    * @property filters
    * @type {any}
    * @memberof HomePage
    */
   public filters: any;


   /**
    * @public
    * @property displayFilters
    * @type {boolean}
    * @memberof HomePage
    */
   public displayFilters = false;


   /**
    * @public
    * @property filtersText
    * @type {string}
    * @memberof HomePage
    */
   public filtersText = 'Display Filters';


   /**
    * @public
    * @property summary
    * @type {string}
    * @memberof HomePage
    */
   public summary: string;


   /**
    * @public
    * @property europe
    * @type {any}
    * @memberof HomePage
    */
   public europe: any 		 	= {
                                lat 	: '50.537421',
                                lng 	: '15.114438',
                                zoom  : 4
                              };


   /**
    * @private
    * @property coords
    * @type {any}
    * @memberof HomePage
    */
   private coords: any       = {
                                  lat 	: this.europe.lat,
                                  lng 	: this.europe.lng,
                                  zoom  : this.europe.zoom
                                };


   /**
    * @private
    * @property accessToken
    * @type {string}
    * @memberof HomePage
    */
   private accessToken: any = environment.keys.maps.token;


   /**
    * @public
    * @property mapCenter
    * @type {any}
    * @memberof HomePage
    */
   public mapCenter;


   /**
    * @public
    * @property zoomLevel
    * @type {any}
    * @memberof HomePage
    */
   public zoomLevel;


   /**
    * @public
    * @property leafletOptions
    * @type {any}
    * @memberof HomePage
    */
   public leafletOptions;


  /**
   * @constructor
   * Creates an instance of HomePage.
   * @param {ManagerService} manager
   * @param {DistancesService} distances
   * @param {Platform} platform
   * @param {ToastController} toast
   * @memberof HomePage
   */
  constructor(private manager: ManagerService,
              private distances: DistancesService,
              private platform: Platform,
              private toast: ToastController) {}


  /**
   * @method ngOnInit
   * @description   Triggered when component is initialised on first launch
   * @memberof HomePage
   */
  ngOnInit() { }


  /**
   * @method ngAfterViewInit
   * @description   Triggered after component view has been initialised
   * @memberof HomePage
   */
  ngAfterViewInit() {
    this.platform
      .ready()
      .then(() => {
        this.determineCurrentLocationsAndBootstrap();
      });
  }


  /**
   * @private
   * @method determineCurrentLocationsAndBootstrap
   * @description   Determines the current location and initialises map with data
   * @returns {none}
   * @memberof HomePage
   */
  private determineCurrentLocationsAndBootstrap(): void {
    Geolocation
    .getCurrentPosition()
    .then((results: any) => {
      this.coords = {
        lat   :   results.coords.latitude,
        lng   :   results.coords.longitude,
        zoom  :   4
      };
      this.bootstrapAndRenderMapWithStoreLocations();
    })
    .catch((error) => {
      this.bootstrapAndRenderMapWithStoreLocations();
    });
  }


  /**
   * @private
   * @method initialiseMap
   * @param {number}    lat       The initial latitude coordinate for the map centre
   * @param {number}    lng       The initial longitude coordinate for the map centre
   * @param {number}    zoo       How far the map should be zoomed into for initial viewing
   * @description     Configure the LeafletJS Map for rendering within the view template
   * @returns {none}
   * @memberof HomePage
   */
  private initialiseMap(lat: number,
                        lng: number,
                        zoom: number): void {
    this.leafletOptions = [tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      // tslint:disable-next-line:max-line-length
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      accessToken: this.accessToken
    })];

    this.mapCenter  = latLng([ lat, lng ]);
    this.zoomLevel  = zoom;
  }


  /**
   * @private
   * @method bootstrapAndRenderMapWithStoreLocations
   * @description   Render the LeafletJS map, the Apple Store locations and list of European countries
   * @return {none}
   * @memberof HomePage
   */
  private bootstrapAndRenderMapWithStoreLocations(): void {
    this.initialiseMap(this.europe.lat, this.europe.lng, this.europe.zoom);
    this.initialiseStoreLocations();
    this.renderCountries();
  }


  /**
   * @public
   * @method onMapReady
   * @param {L.Map}    map       The Leaflet Map directive
   * @description     Allows the Map object to be accessed
   * @returns {none}
   * @memberof HomePage
   */
  public onMapReady(mapObj: L.Map): void {
    // Refresh the Map (forces tiles to reload and render correctly)
    setTimeout(() => {
       mapObj.invalidateSize();
    }, 0);
  }


  /**
   * @private
   * @method initialiseStoreLocations
   * @description    Retrieves store locations data for rendering to the component view
   * @returns {none}
   * @memberof HomePage
   */
  private initialiseStoreLocations(): void {
    this.locations$ = from(this.manager.getLocations())
                .pipe(
                  tap((data: Array<Location>) => {
                    this.stores = data;
                    this.renderLocations(data, null, null, null);
                    this.summary      = `${data.length} Apple Stores`;
                  })
                );
  }


  /**
   * @private
   * @method renderCountries
   * @description     Retrieve ALL European country locations for rendering to the component view
   * @return {none}
   * @memberof HomePage
   */
  private renderCountries(): void {
    this.countries$ = from(this.manager.getCountries())
    .pipe(
      tap((data: Array<Country>) => {
        this.countryData = data;
      })
    );
  }


  /**
   * @private
   * @method renderLocations
   * @param {array}       locations         The Apple Store locations
   * @param {string}      lat               The map location latitude value
   * @param {string}      lng               The map location longitude value
   * @param {number}      zoom              The zoom level the map should be viewed at
   * @description     Render ALL Apple Store locations as LeafletJS map markers AND as a
   *                  list displayed under the map
   * @return {none}
   * @memberof HomePage
   */
   private renderLocations(locations: Array<Location>,
                           lat: number | null  = null,
                           lng: number | null  = null,
                           zoom: number | null = null): void {
    this.ifCoordinatesAreAvailableRefreshMap(lat, lng, zoom);
    this.ifWeHaveMapMarkersThenRemoveThem();
    this.doWeHaveStoresToRender(locations);
  }


  /**
   * @private
   * @method ifCoordinatesAreAvailableRefreshMap
   * @param {(number | null)} lat
   * @param {(number | null)} lng
   * @param {(number | null)} zoom
   * @description         Refreshes the current map location if new coordinates
   *                      are made available
   * @memberof HomePage
   */
  private ifCoordinatesAreAvailableRefreshMap(lat: number | null,
                                              lng: number | null,
                                              zoom: number | null): void {
    if (lat !== null && lng !== null && zoom !== null) {
      this.initialiseMap(lat, lng, zoom);
    }
  }


  /**
   * @private
   * @method ifWeHaveMapMarkersThenRemoveThem
   * @description       Remove map markers if detected
   * @returns {none}
   * @memberof HomePage
   */
  private ifWeHaveMapMarkersThenRemoveThem(): void {
    if (this.markers.length !== 0) {
      this.removeMapMarkers();
   }
  }


  /**
   * @private
   * @method addMapMarkersForLocations
   * @param {Array<Location>} locations
   * @description     Adds map markers for each specified coordinate (that represents the
   *                  Apple Store locations)
   * @returns {none}
   * @memberof HomePage
   */
  private addMapMarkersForLocations(locations: Array<Location>): void {
    locations.forEach(location => {
      this.addMapMarkers(location.lat, location.lng);
    });
  }

  /**
   * @private
   * @method doWeHaveStoresToRender
   * @param {Array<Location>} locations
   * @description       Determines if data is present for rendering Apple Store locations
   *                    to the map
   * @returns {none}
   * @memberof HomePage
   */
  private doWeHaveStoresToRender(locations: Array<Location>): void {
    if (locations.length !== 0) {
      this.addMapMarkersForLocations(locations);
      this.locationsPresent	=	true;
      this.locations$  		  = of(locations);
    } else {
      const message = 'No stores were found for your selected search criteria. Please try a different search.';
      this.storeNotification(message);
      this.locationsPresent	=	false;
    }
  }


  /**
   * @private
   * @method addMapMarkers
   * @param {number}      lat               The marker location latitude value
   * @param {number}      lng               The marker location longitude value
   * @description     Generates and stores all map markers in an array
   * @return {none}
   * @memberof HomePage
   */
  private addMapMarkers(lat: number, lng: number): void {
    const MARKER = marker([lat, lng], {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'assets/leaflet/marker-icon.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png'
      })
    });
    this.markers.push(MARKER);
  }


  /**
   * @private
   * @method removeMapMarkers
   * @description   Removes all map markers from their array
   * @return {none}
   * @memberof HomePage
   */
  private removeMapMarkers(): void {
    this.markers.length = 0;
  }


  /**
   * @public
   * @method renderAllStoreLocations
   * @description     Renders ALL Apple Store locations to the map
   * @return {none}
   * @memberof HomePage
   */
  public renderAllStoreLocations(): void {
    this.removeMapMarkers();
    // this.locations 				= this.allStores;

    this.renderLocations(this.stores, this.europe.lat, this.europe.lng, this.europe.zoom);
    this.displayLocationFilters();
    this.summary = `${this.stores.length} Apple Stores`;
  }


  /**
   * @private
   * @method renderLocationsByCountry
   * @param {string}      id          The country id
   * @description     Renders ALL Apple Store locations to the map based on their
   *                  country assignment
   * @return {none}
   * @memberof HomePage
   */
  private renderLocationsByCountry(id: number): void {
     let j: any,
         country: number,
         lat: any,
         lng: any,
         zoom: number;

     const stores: Array<any>   = [];

     // Iterate through countries first
     this.countryData.forEach((item: any) => {
      if (id === item.id) {
        country		= item.country;
        lat 			= item.lat;
        lng 			= item.lng;
        zoom 			= item.zoom;
      }
     });


     // Iterate through Apple Store locations
     for (j in this.stores) {
      if (id === Number(this.stores[j].country)) {
        stores.push({
          id 			    : this.stores[j].id,
          country 	  : this.stores[j].country,
          name 		    : this.stores[j].name,
          address 	  : this.stores[j].address,
          lat 		    : this.stores[j].lat,
          lng 		    : this.stores[j].lng,
          zoom 		    : this.stores[j].zoom,
          isFavourite	: this.stores[j].isFavourite
        });
      }
     }

     this.renderLocations(stores, lat, lng, 4);
     this.summary = `${country} - ${stores.length} Apple Stores`;
  }


  /**
   * @public
   * @method filterLocationsByCountry
   * @param {string}      byCountry          The country id to filter locations on
   * @description     Filters the display of Apple Store locations based on their country
   * @return {none}
   * @memberof HomePage
   */
  public filterLocationsByCountry(byCountry: string): void {
    const countryId = Number(byCountry);
    this.removeMapMarkers();
    this.renderLocationsByCountry(countryId);
    this.displayLocationFilters();
  }


  /**
   * @public
   * @method filterLocationsByNearest
   * @param {any}      byNearest          The country id to filter locations on
   * @description   Filters the display of Apple Store locations by those closest
   *                to current location within a given range
   * @return {none}
   * @memberof HomePage
   */
  public filterLocationsByNearest(byNearest: any): void	{
     this.removeMapMarkers();
     this.determineNearestLocations(byNearest);
     this.displayLocationFilters();
  }


  /**
   * @private
   * @method determineNearestLocations
   * @param {any}      range          The radius to search and return results within
   * @description     Determine and return those Apple Store locations closest to current
   *                  location within a given range
   * @return {none}
   * @memberof HomePage
   */
  private determineNearestLocations(range: any): void {
    const currentGeoLat: number    	= 	this.coords.lat,
          currentGeoLng: number    	= 	this.coords.lng,
          stores: Array<any>        =	  [],
          rangeToSearch: number	    =	  Number(range),
          zoom: number              =	  this.coords.zoom;

    this.stores.forEach(store => {
      const storeLat 		=	store.lat,
            storeLng 		=	store.lng,
            distance 		=	this.distances.calculateDistanceInKilometres(currentGeoLat, currentGeoLng, storeLat, storeLng);

      // If range is less than or equal to distance returned then push following into array?
      if (distance <= rangeToSearch) {
        stores.push({
          id 			    : store.id,
          country 	  : store.country,
          name 		    : store.name,
          address 	  : store.address,
          lat 		    : store.lat,
          lng 		    : store.lng,
          zoom 		    : store.zoom,
          isFavourite	: store.isFavourite,
          distance    : distance
        });
      }
    });

    this.renderLocations(stores, currentGeoLat, currentGeoLng, zoom);
    this.summary = `${stores.length} Apple Stores found within ${rangeToSearch} Km of your location`;
  }


  /**
   * @public
   * @method displayLocationFilters
   * @description       Manages the display of filtering options for rendering
   *                    Apple Store locations based on country and nearest to
   *                    current location
   * @return {none}
   * @memberof HomePage
   */
  public displayLocationFilters(): void {
     this.displayFilters 			= !this.displayFilters;
     if (this.displayFilters) {
        this.filtersText 	= 'Hide these filters';
     } else {
        this.filtersText 	= 'Display Filters';
     }
  }


  /**
   * @private
   * @async
   * @method storeNotification
   * @param {string}    message         The message to be displayed to the user
   * @description     Creates/displays an Ionic ToastController message
   * @return {Promise<any>}
   * @memberof HomePage
   */
  private async storeNotification(warning: string): Promise<any> {
     const notification = await this.toast.create({
       message  : warning,
       duration : 3000
     });
     await notification.present();
  }

}
