/**
 * Tab3Page
 *
 * @author James Griffiths
 * @date 20/05/2020
 * @version 0.1
 * @export
 * @class Tab3Page
 * @packageDocumentation
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { FavouriteMoviesService } from '../services/favourite-movies.service';
import { MoviedbApiService } from '../services/moviedb-api.service';
import { MoviesListenerService } from '../services/movies-listener.service';
import { StorageService } from '../services/storage.service';
import { environment } from '../../environments/environment';
import { Observable, from, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Tab3Page implements OnInit, OnDestroy {


  /**
   * @public
   * @property favouritesObj$
   * @type {Observable<any>}
   * @memberof Tab3Page
   */
  public favouritesObj$: Observable<any>;


  /**
   * @public
   * @property configObj
   * @type {Subscription}
   * @memberof Tab3Page
   */
  public configObj: Subscription;


  /**
   * @public
   * @property favouritesExist
   * @type {boolean}
   * @memberof Tab3Page
   */
  public favouritesExist: boolean;


  /**
   * @public
   * @property config
   * @type {any}
   * @memberof Tab3Page
   */
  public config: any = {};


  /**
   * @public
   * @property selectedGenre
   * @type {string}
   * @memberof Tab3Page
   */
  public selectedGenre: string;


  /**
   * @public
   * @property parsedFavourites
   * @type {Array<any>}
   * @memberof Tab3Page
   */
  public parsedFavourites: Array<any> = [];


  /**
   * @private
   * @property favouritesInDescendingOrder
   * @type {Array<any>}
   * @memberof Tab3Page
   */
  private favouritesInDescendingOrder: Array<any> = [];


  /**
   * @public
   * @property sectionType
   * @type {string}
   * @memberof Tab3Page
   */
  public sectionType = 'Favourites';


  /**
   * @private
   * @property STORAGE_KEY
   * @type {string}
   * @memberof Tab3Page
   */
  private STORAGE_KEY: string = environment.keys.storage.myMovies;


  /**
   * @constructor
   * Creates an instance of Tab3Page.
   * @param {FavouriteMoviesService} favourites
   * @param {MoviedbApiService} movies
   * @param {MoviesListenerService} movieListener
   * @param {StorageService} storage
   * @param {ChangeDetectorRef} cdr
   * @memberof Tab3Page
   */
  constructor(private favourites: FavouriteMoviesService,
              private movies: MoviedbApiService,
              private movieListener: MoviesListenerService,
              private storage: StorageService,
              private cdr: ChangeDetectorRef) {}


  /**
   * @method ngOnInit
   * @description   Angular lifecycle hook - triggered once on component initialisation
   *                Here we bootstrap the page with triggering the following methods:
   *                1.  getConfiguration
   *                2.  listenForRemovedMovies
   * @memberof Tab3Page
   * @returns {none}
   */
  ngOnInit() {
    this.getConfiguration();
    this.listenForRemovedMovies();
  }


  /**
   * @method ionViewDidEnter
   * @description       Ionic lifecyclehook - triggered AFTER the component view has entered.
   *                    Here we trigger the doWeHaveExistingFavourites method for rendering
   *                    any saved favourite movies to the component template
   * @memberof Tab3Page
   * @returns {none}
   */
  ionViewDidEnter() {
    this.doWeHaveExistingFavourites();
    this.cdr.detectChanges();
  }


  /**
   * @method ngOnDestroy
   * @description     Angular lifecycle hook - triggered when component is destroyed.
   *                  Here we remove any subscriptions/perform garbage collection
   * @memberof Tab3Page
   */
  ngOnDestroy() {
    this.configObj.unsubscribe();
  }


  /**
   * @private
   * @method listenForRemovedMovies
   * @description     Listens for movies that have been removed and updates the saved favourites accordingly
   *                  whilst also saving that back to Ionic Storage for persistence
   * @memberof Tab3Page
   * @returns {none}
   */
  private listenForRemovedMovies(): void {
    this.movieListener.resultListener$.subscribe((data: Array<any>) => {
      if (this.parsedFavourites.length > 0) {
        this.favouritesObj$ = of(data).pipe(
          map(val => {
            this.parsedFavourites = [...val];
            this.favouritesInDescendingOrder = [...val].reverse();
            this.storage.set(this.STORAGE_KEY, JSON.stringify(this.parsedFavourites));
            return val;
          })
        );
      }
    });
  }


  /**
   * @private
   * @method getConfiguration
   * @description   Retrieves the API URL and API Key details
   * @memberof Tab3Page
   * @returns {none}
   */
  private getConfiguration(): void {
    this.configObj = this.movies
      .getConfiguration()
      .subscribe((data: any) => {
        this.config = data;
      });
  }


  /**
   * @private
   * @method doWeHaveExistingFavourites
   * @description     Determines if there are existing favourites, if there are they are then parsed and rendered
   *                  into the component template
   * @memberof Tab3Page
   * @returns {none}
   */
  private doWeHaveExistingFavourites(): void  {
    this.parsedFavourites = [];
    this.favouritesObj$ = from(this.favourites.doWeHaveExistingFavourites())
      .pipe(
        map(val => {
          let items = val;
          if (items === null) {
            this.favouritesExist = false;
            items = [];
          } else {
            this.favouritesExist = true;
            this.parsedFavourites = [...items];
            this.favouritesInDescendingOrder = [...items].reverse();
            this.movieListener.moviesToBeParsed(this.parsedFavourites);
          }
          return items;
        })
      );
  }


  /**
   * @public
   * @method displayFilmsInFollowingOrder
   * @param {*} ev
   * @description     Allows the saved favourites to display films in ascending or descending order
   * @memberof Tab3Page
   * @returns {none}
   */
  public displayFilmsInFollowingOrder(ev: any): void {
    console.dir(ev);
    const displayOrder = ev.detail.value;

    if (displayOrder === 'asc') {
      this.favouritesObj$ = of(this.parsedFavourites);
    } else {
      this.favouritesObj$ = of(this.favouritesInDescendingOrder);
    }
  }


  /**
   * @public
   * @method filterMoviesByselectedGenre
   * @param {string} selectedGenre
   * @description     Allows the saved favourites to only display those movies belonging to a specific genre
   * @memberof Tab3Page
   * @returns {none}
   */
  public filterMoviesByselectedGenre(selectedGenre: string): void {
    const movies = [];
    this.parsedFavourites.filter(item => {
      if (item.genres.includes(selectedGenre)) {
        movies.push(item);
      }
    });
    this.favouritesObj$ = of(movies);
  }

}
