/**
 * Tab2Page
 *
 * @author James Griffiths
 * @date 20/05/2020
 * @version 0.1
 * @export
 * @class Tab2Page
 * @packageDocumentation
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoviedbApiService } from '../services/moviedb-api.service';
import { SelectedSavedSearchListenerService } from '../services/selected-saved-search-listener.service';
import { MoviesListenerService } from '../services/movies-listener.service';
import { SavedSearchesListComponent } from '../components/shared-components/saved-searches-list/saved-searches-list.component';
import { StorageService } from '../services/storage.service';
import { Observable, Subscription, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Tab2Page implements OnInit, OnDestroy {


  /**
   * @public
   * @property savedSearchObj$
   * @type {Observable<any>}
   * @memberof Tab2Page
   */
  public savedSearchObj$: Observable<any>;


  /**
   * @public
   * @property configObj
   * @type {Subscription}
   * @memberof Tab2Page
   */
  public configObj: Subscription;


  /**
   * @public
   * @property parsedSavedSearches
   * @type {Array<any>}
   * @memberof Tab2Page
   */
  public parsedSavedSearches: Array<any> = [];


  /**
   * @private
   * @property savedSearchesInDescendingOrder
   * @type {Array<any>}
   * @memberof Tab2Page
   */
  private savedSearchesInDescendingOrder: Array<any> = [];


  /**
   * @public
   * @property config
   * @type {*}
   * @memberof Tab2Page
   */
  public config: any = {};


  /**
   * @public
   * @property sectionType
   * @type {string}
   * @memberof Tab2Page
   */
  public sectionType = 'savedSearches';


  /**
   * @public
   * @property savedSearchKey
   * @type {string}
   * @memberof Tab2Page
   */
  public savedSearchKey: string;


  /**
   * @private
   * @property modalObj
   * @type {*}
   * @memberof Tab2Page
   */
  private modalObj: any;


  /**
   * @public
   * @property noSavedSearchLoaded
   * @type {boolean}
   * @memberof Tab2Page
   */
  public noSavedSearchLoaded = true;


  /**
   * @constructor
   * Creates an instance of Tab2Page.
   * @param {ModalController} modal
   * @param {MoviedbApiService} movies
   * @param {SelectedSavedSearchListenerService} selectedSavedSearch
   * @param {StorageService} storage
   * @param {MoviesListenerService} movieListener
   * @param {ChangeDetectorRef} cdr
   * @memberof Tab2Page
   */
  constructor(private modal: ModalController,
              private movies: MoviedbApiService,
              private selectedSavedSearch: SelectedSavedSearchListenerService,
              private storage: StorageService,
              private movieListener: MoviesListenerService,
              private cdr: ChangeDetectorRef) {}


  /**
   * @method ngOnInit
   * @description   Angular lifecycle hook - triggered once on component initialisation
   *                Here we bootstrap the page with triggering the following methods:
   *                1.  getConfiguration
   *                2.  listenForRemovedMovies
   * @memberof Tab2Page
   * @returns {none}
   */
  ngOnInit() {
    this.getConfiguration();
    this.listenForRemovedMovies();
  }


  /**
   * @method ionViewDidEnter
   * @description       Ionic lifecyclehook - triggered AFTER the component view has entered.
   *                    Here we subscribe for data broadcast from the selectedSavedSearch service to
   *                    listen for any changes made to the saved search currently loaded/displayed
   * @memberof Tab2Page
   * @retusn {none}
   */
  ionViewDidEnter() {
    this.selectedSavedSearch.resultListener$.subscribe((results: any) => {
      if (results.hasOwnProperty('name') && results.hasOwnProperty('data')) {
        this.savedSearchKey = results.name;
        this.renderMoviesFromSelectedSavedSearch(results.data);
      }
      this.cdr.detectChanges();
    });
  }


  /**
   * @method ngOnDestroy
   * @description     Angular lifecycle hoon - triggered when component is destroyed.
   *                  Here we remove any subscriptions/perform garbage collection
   * @memberof Tab2Page
   */
  ngOnDestroy() {
    this.configObj.unsubscribe();
  }


  /**
   * @private
   * @method renderMoviesFromSelectedSavedSearch
   * @param {*} movies
   * @description     Create an observable that will render all movies from the selected saved search
   *                  to the component view
   * @memberof Tab2Page
   * @returns {none}
   */
  private renderMoviesFromSelectedSavedSearch(movies: any): void {
    this.savedSearchObj$ = of(movies)
                        .pipe(
                          map(val => {
                            let items = val;
                            if (items !== undefined ) {
                              this.initialiseSearches(items);
                            } else {
                              items = [];
                            }
                            return items;
                          })
                        );
    this.cdr.detectChanges();
  }


  /**
   * @private
   * @method initialiseSearches
   * @param {Array<any>} val
   * @description     Assigns saved searches to specific arrays (one for general parsing and one for
   *                  displaying reversed order of movies) and broadcasts parsed movies for updating
   *                  the component where required (I.e. after removing a film from the saved search)
   * @memberof Tab2Page
   * @returns {none}
   */
  private initialiseSearches(val: Array<any>): void {
    this.noSavedSearchLoaded = false;
    this.parsedSavedSearches = [...val];
    this.savedSearchesInDescendingOrder = [...val].reverse();
    this.movieListener.moviesToBeParsed(this.parsedSavedSearches);
  }


  /**
   * @private
   * @method listenForRemovedMovies
   * @description     Listens for movies that have been removed and updates the saved search accordingly
   *                  whilst also saving that back to Ionic Storage for persistence
   * @memberof Tab2Page
   * @returns {none}
   */
  private listenForRemovedMovies(): void {
    this.movieListener.resultListener$.subscribe((data: Array<any>) => {
      if (this.parsedSavedSearches.length > 0) {
        this.savedSearchObj$ = of(data).pipe(
          map(val => {
            this.parsedSavedSearches = [...val];
            this.savedSearchesInDescendingOrder = [...val].reverse();
            const heading = this.savedSearchKey.replace(/\W+/g, '-').toLowerCase();
            this.storage.set(heading, JSON.stringify(this.parsedSavedSearches));
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
   * @memberof Tab2Page
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
   * @public
   * @async
   * @method listSavedSearches
   * @method Creates a ModalController window - using the SavedSearchesListComponent as its content
   *         This is where all saved searches will be displayed for selection.
   * @returns {Promise<any>}
   * @memberof Tab2Page
   */
  public async listSavedSearches(): Promise<any> {
    this.modalObj = await this.modal.create({
      component: SavedSearchesListComponent
    });
    return await this.modalObj.present();
  }


  /**
   * @public
   * @method filterMoviesByselectedGenre
   * @param {string} selectedGenre
   * @description     Allows the saved search to only display those movies belonging to a specific genre
   * @memberof Tab2Page
   * @returns {none}
   */
  public filterMoviesByselectedGenre(selectedGenre: string): void {
    const movies = [];
    this.parsedSavedSearches.filter(item => {
      if (item.genres.includes(selectedGenre)) {
        movies.push(item);
      }
    });

    // Convert movies array to observable and assign to savedSearchObj$ for updating
    // movies displayed within the component view 
    this.savedSearchObj$ = of(movies);
  }


  /**
   * @public
   * @method displaySavedSearchesInFollowingOrder
   * @param {*} ev
   * @description     Allows the saved search to display films in ascending or descending order 
   * @memberof Tab2Page
   * @returns {none}
   */
  public displaySavedSearchesInFollowingOrder(ev: any): void {
    const displayOrder = ev.detail.value;

    if (displayOrder === 'asc') {
      this.savedSearchObj$ = of(this.parsedSavedSearches);
    } else {
      this.savedSearchObj$ = of(this.savedSearchesInDescendingOrder);
    }
  }

}
