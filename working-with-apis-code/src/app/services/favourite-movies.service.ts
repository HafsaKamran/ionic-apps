/**
 * FavouriteMoviesService
 *
 * Manages saving/retrieving movies that have bene saved as favourites to Capacitor
 * Storage using the StorageService
 * 
 * @author James Griffiths
 * @date 20/05/2020
 * @version 0.1
 * @export
 * @class FavouriteMoviesService
 * @packageDocumentation
 */
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { environment } from '../../environments/environment';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';


/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
export class FavouriteMoviesService {


  /**
   * @private
   * @property STORAGE_KEY
   * @type {string}
   * @memberof FavouriteMoviesService
   */
  private STORAGE_KEY: string = environment.keys.storage.myMovies;


  /**
   * @constructor
   * Creates an instance of FavouriteMoviesService.
   * @param {StorageService} storage
   * @memberof FavouriteMoviesService
   */
  constructor(private storage: StorageService) { }


  /**
   * @public
   * @async
   * @method doWeHaveExistingFavourites
   * @description     Retrieves whatever data may exist from the Storage utility based on the
   *                  supplied key value
   * @returns {Promise<any>}
   * @memberof FavouriteMoviesService
   */
  public async doWeHaveExistingFavourites(): Promise<any> {
    return await this.storage
    .get(this.STORAGE_KEY);
  }


  /**
   * @public
   * @method doesItemAlreadyExistInFavourites
   * @param {number} movieId
   * @param {*} movie
   * @description     Determines whether a movie to be saved as a favourite already exists in Storage or not.
   *                  If it doesn't the movie is saved.
   * @returns {Observable<any>}
   * @memberof FavouriteMoviesService
   */
  public doesItemAlreadyExistInFavourites(movieId: number, movie: any): Observable<any> {
    return from(this.storage.get(this.STORAGE_KEY))
    .pipe(
      map(val => {
        let outcome: boolean;
        if (val !== null) {
          console.log('Parsed favourites');
          console.dir(val);
          console.dir(val.filter(item => item.id === movieId));

          const items = val.filter(item => item.id === movieId);
          if (items.length > 0) {
            outcome = true;
          } else {
            val.push(movie);
            this.storage.set(this.STORAGE_KEY, JSON.stringify(val));
            outcome = false;
          }

        } else {
          const arr = [];
          arr.push(movie);
          this.storage.set(this.STORAGE_KEY, JSON.stringify(arr));
          outcome = false;
        }
        return false;
      })
    );
  }

}
