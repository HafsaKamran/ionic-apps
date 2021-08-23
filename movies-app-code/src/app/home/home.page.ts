/** 
 * 
 * HomePage
 * 
 * This class manages the logic and rendering for the movies app
 *
 * @author James Griffiths
 * @date 11/08/2020
 * @version 0.1
 * @export
 * @class HomePage
 * @packageDocumentation
 */
import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { FormGroup,
         Validators,
         FormBuilder } from '@angular/forms';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  /**
   * @public
   * @property form
   * @type {FormGroup}
   * @memberof HomePage
   */
  public form: FormGroup;


  /**
   * @public
   * @property storageKey
   * @type {string}
   * @memberof HomePage
   */
  public storageKey          		= 'MoviesObj';


  /**
   * @public
   * @property isData
   * @type {boolean}
   * @memberof HomePage
   */
  public isData 		            = false;


  /**
   * @public
   * @property storedData
   * @type {Array<any>}
   * @memberof HomePage
   */
  public storedData: Array<any>	= [];


  /**
   * @public
   * @property movies
   * @type {Array<any>}
   * @memberof HomePage
   */
  public movies: Array<any>			= [];


  /**
   * Creates an instance of HomePage
   * @constructor
   * @param {StorageService} storage
   * @param {FormBuilder} fb
   * @param {ToastController} toast
   * @param {Platform} platform
   * @memberof HomePage
   */
  constructor(private storage: StorageService,
              public fb: FormBuilder,
              private toast: ToastController,
              private platform: Platform) {
    this.platform
    .ready()
    .then(() => {
        this.renderMovies();
    });

    this.form = fb.group({
        movieName: ['', Validators.required]
    });

    this.clearFieldValues();
  }


  /**
   * @public
   * @method renderMovies
   * @memberof HomePage
   * @returns none
   */
  public renderMovies(): void {
    this.storage
    .get(this.storageKey)
    .then((data) => {
      if (data && data.length > 0) {
        const existingData       = Object.keys(data).length;

        if (existingData !== 0) {
          this.storedData 	= data;
          this.isData 		  = true;
        }
        this.setMovies(this.storedData);
      }
    })
    .catch((error: any) => {
      console.dir(error);
    });
  }


  /**
   * @public
   * @method setMovies
   * @param {Array<any>} data
   * @memberof HomePage
   * @returns none
   */
  public setMovies(data: Array<any>): void {
    let k;
    this.movies = [];
    for (k in data) {
      this.movies.push({
        movie: data[k].movie
      });
    }
  }


  /**
   * @public
   * @method saveMovie
   * @memberof HomePage
   * @returns none
   */
  public saveMovie(): void {
    const movieName: string      =  this.form.get('movieName').value;
    let i = 0,
          k: any;

    // Determine if movie has already been added to the array
    for (k in this.storedData) {
      if (this.storedData[k].movie === movieName) {
        i++;
      }
    }

    if (i === 0) {
      this.movies.push({
        movie : movieName
      });
      this.storeMovie(this.movies, movieName);
    } else {
      const message 	=	`The movie ${movieName} has already been stored. Please enter a different movie title.`;
      this.storageNotification(message);
    }
  }


  /**
   * @public
   * @method storeMovie
   * @param {Array<any>} movies
   * @param {string} movie
   * @memberof HomePage
   * @returns none
   */
  public storeMovie(movies: Array<any>, movie: string): void {
    const moviesStored  = movies;

    this.storage
    .set(this.storageKey, moviesStored)
    .then(() => {
        this.renderMovies();
        const message  = `The movie title ${movie} was added successfully`;
        this.clearFieldValues();
        this.storageNotification(message);
    })
    .catch(() => {
        const message = `Whoops! Something went wrong. The movie title ${movie} was NOT added`;
        this.storageNotification(message);
    });
  }


  /**
   * @private
   * @method get
   * @returns {Promise<any>}
   * @memberof HomePage
   */
  private get(): Promise<any> {
    return this.storage.get(this.storageKey);
  }


  /**
   * @public
   * @method remove
   * @param {string} movieName
   * @memberof HomePage
   * @returns none
   */
  public remove(movieName: string): void {
    this.get().then((data: Array<any>) => {
      console.dir(data);
      let movies = data;
      data.forEach((item, index) => {
        if (item.movie === movieName) {
          movies.splice(index, 1);
        }
      });

      // While we have data
      if (data.length >= 0) {
         this.update(movies, movieName);
      }


      if (data.length === 0) {
        movies = null;
        this.storedData = [];
        this.movies = [];
      }
    })
    .catch((error: any) => {
      console.dir(error);
    });
  }


  /**
   * @private
   * @method update
   * @param {Array<any>} movies
   * @param {string} movie
   * @memberof HomePage
   * @returns none
   */
  private update(movies: Array<any>, movie: string): void {
    this.storage
    .set(this.storageKey, movies)
    .then(() => {
       this.renderMovies();
       const message  = `The movie title ${movie} was successfully removed`;
       this.clearFieldValues();
       this.storageNotification(message);
    })
    .catch((error: any) => {
      console.dir(error);
    });
  }


  /**
   * @private
   * @method clearFieldValues
   * @memberof HomePage
   * @returns none
   */
  private clearFieldValues(): void {
    this.form.get('movieName').setValue('');
  }


  /**
   * @public
   * @method clear
   * @memberof HomePage
   * @returns none
   */
  public clear(): void {
    this.storage
    .remove(this.storageKey)
    .then(() => {
        this.storedData = [];
        this.movies = [];
        this.isData = false;
        const message  = `All movies were successfully removed`;
        this.clearFieldValues();
        this.storageNotification(message);
    })
    .catch((error: any) => {
      console.dir(error);
    });
  }


  /**
   * @private
   * @method storageNotification
   * @param {string} displayMessage
   * @returns {Promise<any>}
   * @memberof HomePage
   */
  private async storageNotification(displayMessage: string): Promise<any> {
    const notification = await this.toast.create({
      message  : displayMessage,
      duration : 3000
    });
    notification.present();
  }

}
