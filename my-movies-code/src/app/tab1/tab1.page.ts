/**
 * Tab1Page
 *
 * @author James Griffiths
 * @date 20/05/2020
 * @version 0.1
 * @export
 * @class Tab1Page
 * @packageDocumentation
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  Validators } from '@angular/forms';
import { MoviedbApiService } from '../services/moviedb-api.service';
import { StorageService } from '../services/storage.service';
import { MoviesListenerService } from '../services/movies-listener.service';
import { Observable, Subscription, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {


  /**
   * @public
   * @property moviesObj$
   * @type {Observable<any>}
   * @memberof Tab1Page
   */
  public moviesObj$: Observable<any>;


  /**
   * @public
   * @property configObj
   * @type {Subscription}
   * @memberof Tab1Page
   */
  public configObj: Subscription;


  /**
   * @public
   * @property genresObj
   * @type {Subscription}
   * @memberof Tab1Page
   */
  public genresObj: Subscription;


  /**
   * @public
   * @property parsedMovies
   * @type {Array<any>}
   * @memberof Tab1Page
   */
  public parsedMovies: Array<any> = [];


  /**
   * @public
   * @property searchedItem
   * @type {string}
   * @memberof Tab1Page
   */
  public searchedItem: string;


  /**
   * @public
   * @property form
   * @type {FormGroup}
   * @memberof Tab1Page
   */
  public form: FormGroup;


  /**
   * @private
   * @property genres
   * @type {Array<{id: number, name: string }>}
   * @memberof Tab1Page
   */
  private genres: Array<{id: number, name: string }> = [];


  /**
   * @public
   * @property config
   * @type {*}
   * @memberof Tab1Page
   */
  public config: any = {};


  /**
   * @public
   * @property sectionType
   * @type {string}
   * @memberof Tab1Page
   */
  public sectionType = 'Films';


  /**
   * @constructor
   * Creates an instance of Tab1Page.
   * @param {FormBuilder} fb
   * @param {MoviedbApiService} movies
   * @param {StorageService} storage
   * @param {MoviesListenerService} movieListener
   * @param {AlertController} alert
   * @memberof Tab1Page
   */
  constructor(public fb: FormBuilder,
              private movies: MoviedbApiService,
              private storage: StorageService,
              private movieListener: MoviesListenerService,
              private alert: AlertController) {
    this.form 		= fb.group({
      searchTerm 		: ['', [Validators.required, Validators.minLength(2)]]
    });
  }


  /**
   * @method ionViewWillEnter
   * @description       Ionic lifecyclehook - triggered BEFORE the component view has entered.
   *                    Here we ensure the moviesObj$$ observable has an empty array (to avoid displaying
   *                    cached results from any previous movie search)
   * @memberof Tab1Page
   * @returns {none}
   */
  ionViewWillEnter() {
    this.moviesObj$ = of([]);
  }


  /**
   * @method ngOnInit
   * @description   Angular lifecycle hook - triggered once on component initialisation
   *                Here we bootstrap the page with triggering the following methods:
   *                1.  getConfiguration
   *                2.  getGenres
   *                3.  listenForRemovedMovies
   * @memberof Tab1Page
   * @returns {none}
   */
  ngOnInit() {
    this.getConfiguration();
    this.getGenres();
    this.listenForRemovedMovies();
  }


  /**
   * @method ngOnDestroy
   * @description     Angular lifecycle hook - triggered when component is destroyed.
   *                  Here we remove any subscriptions/perform garbage collection
   * @memberof Tab1Page
   */
  ngOnDestroy() {
    this.configObj.unsubscribe();
    this.genresObj.unsubscribe();
  }


  /**
   * @private
   * @method getConfiguration
   * @description     Retrieves all available configuration data from the MoviesDB API
   * @memberof Tab1Page
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
   * @method getGenres
   * @description     Returns all genres associated with movies from the MovieDB API
   * @memberof Tab1Page
   * @returns {none}
   */
  private getGenres(): void {
    this.genresObj = this.movies
      .getMovieGenres()
      .subscribe((data: any) => {
        this.genres = data.genres;
      });
  }


  /**
   * @public
   * @method search
   * @description     Triggers the search for the movie name entered in the search field of the component
   *                  template view
   * @memberof Tab1Page
   * @returns {none}
   */
  public search(): void {
    this.searchedItem = this.form.get('searchTerm').value;
    this.searchForMovie(this.searchedItem);
  }


  /**
   * @private
   * @method searchForMovie
   * @param {string} searchTerm
   * @description       Uses the MovieDB API to retrieve matching results for a specified movie search term,
   *                    parses the results and subsequently renders those to the template view
   * @memberof Tab1Page
   * @returns {none}
   */
  private searchForMovie(searchTerm: string): void {
     this.moviesObj$ = this.movies
                        .getMoviesBySearchTitle(searchTerm)
                        .pipe(
                          map(val => {
                            const data = val.results.map((item: any) => {

                              // Filter genres array
                              const ids = item.genre_ids;
                              const genres = [];
                              this.genres.filter((genre) => {
                                return ids.filter((d) => {
                                  if (genre.id === d) {
                                    genres.push(genre.name);
                                  }
                                });
                              });

                              // Only add an image path if NO null value is present
                              const backdropImage = this.parseBackdropImage(item.backdrop_path);
                              const posterImage = this.parsePosterImage(item.poster_path);

                              // The data to be returned
                              return {
                                id: item.id,
                                popularity: item.popularity,
                                vote_count: item.vote_count,
                                poster_path: posterImage,
                                backdrop_path: backdropImage,
                                original_language: item.original_language,
                                original_title: item.original_title,
                                title: item.title,
                                genres,
                                overview: item.overview,
                                release_date: item.release_date
                              };
                            });

                            this.form.get('searchTerm').setValue('');
                            this.parsedMovies = [...data];
                            this.movieListener.moviesToBeParsed(this.parsedMovies);
                            return data;
                        })
                      );
  }


  /**
   * @private
   * @method parseBackdropImage
   * @param {(string | null)} path
   * @description     Formats the expected backdrop image path for a film record
   * @returns {(string | null)}
   * @memberof Tab1Page
   */
  private parseBackdropImage(path: string| null): string | null {
    return (path !== null) ? this.config.images.base_url + this.config.images.backdrop_sizes[2] + path : null;
  }


  /**
   * @private
   * @method parsePosterImage
   * @param {(string | null)} path
   * @description     Formats the expected poster image path for a film record
   * @returns {(string | null)}
   * @memberof Tab1Page
   */
  private parsePosterImage(path: string | null): string | null {
    return (path !== null) ? this.config.images.base_url + this.config.images.poster_sizes[6] + path : null;
  }


  /**
   * @public
   * @async
   * @method saveThisSearch
   * @description     Displays an AlertController window allowing the user to save the results for their film search
   * @returns {Promise<any>}
   * @memberof Tab1Page
   */
  public async saveThisSearch(): Promise<any> {
    const prompt = await this.alert.create({
      header: 'Save this search',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Please enter a title for this search...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        },
        {
          text: 'Save',
          handler: (ev: any) => {
            this.saveIntoStorage(ev.title);
          }
        }
      ]
    });
    return await prompt.present();
  }


  /**
   * @private
   * @method saveIntoStorage
   * @param {string} title
   * @description     Saves the supplied search into Ionic Storage
   * @memberof Tab1Page
   * @returns {none}
   */
  private saveIntoStorage(title: string): void {
    const heading = title.replace(/\W+/g, '-').toLowerCase();
    const storageKeys = this.storage.keys();
    storageKeys.then((items) => {
       this.determineIfSearchHasAlreadyBeenSaved(heading, items.keys);
    });
  }


  /**
   * @private
   * @method determineIfSearchHasAlreadyBeenSaved
   * @param {string} heading
   * @param {Array<string>} items
   * @description       Determines if the supplied search term already exists within Ionic Storage
   * @memberof Tab1Page
   * @returns {none}
   */
  private determineIfSearchHasAlreadyBeenSaved(heading: string, items: Array<string>): void {
    let valid = true;
    items.forEach((item) => {
      if (item === heading) {
        valid = false;
      }
    });

    if (valid) {
      this.setForStorage(heading);
    } else {
      const message = `The search term ${heading} has already been saved. Please enter a different search term`;
      this.searchAlreadyExistsWarning(message);
    }
  }


  /**
   * @private
   * @method setForStorage
   * @param {string} heading
   * @description       Stores search results within Ionic Storage
   * @memberof Tab1Page
   * @returns {none}
   */
  private setForStorage(heading: string) {
    this.storage
    .set(heading, JSON.stringify(this.parsedMovies));
  }


  /**
   * @private
   * @method listenForRemovedMovies
   * @description     Listens for movies that have been removed and updates the template accordingly
   * @memberof Tab1Page
   * @returns {none}
   */
  private listenForRemovedMovies(): void {
    this.movieListener.resultListener$.subscribe((data: Array<any>) => {
      if (this.parsedMovies.length > 0) {
        this.moviesObj$ = of(data).pipe(
          map(val => {
            this.parsedMovies = [...val];
            return val;
          })
        );
      }
    });
  }


  /**
   * @public
   * @async
   * @method searchAlreadyExistsWarning
   * @param {string} warning
   * @description     Provides an alert window informing the user that the entered name for a saved
   *                  search already ecists within Ionic Storage
   * @returns {Promise<any>}
   * @memberof Tab1Page
   */
  public async searchAlreadyExistsWarning(warning: string): Promise<any> {
    const prompt = await this.alert.create({
      header: 'Error!',
      message: warning,
      buttons: [
        {
          text: 'Ok',
          handler: (ev: any) => { }
        }
      ]
    });
    return await prompt.present();
  }


  /**
   * @public
   * @method filterMoviesByselectedGenre
   * @param {string} selectedGenre
   * @description       Filters the rendered movies to only display those that match the supplied genre
   * @memberof Tab1Page
   * @returns {none}
   */
  public filterMoviesByselectedGenre(selectedGenre: string): void {
    const movies = [];
    this.parsedMovies.filter(item => {
      if (item.genres.includes(selectedGenre)) {
        movies.push(item);
      }
    });

    this.moviesObj$ = of(movies);
  }


}
