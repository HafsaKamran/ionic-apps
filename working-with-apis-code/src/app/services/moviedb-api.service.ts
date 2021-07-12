/**
 * MoviedbApiService
 * 
 * Manages API configuration and calls to the TMDB API service
 *
 * @author James Griffiths
 * @date 20/05/2020
 * @version 0.1
 * @export
 * @class MoviedbApiService
 * @packageDocumentation
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
export class MoviedbApiService {


  /**
   * @public
   * @property API_URL
   * @type {string}
   * @memberof MoviedbApiService
   */
  public API_URL         = 'https://api.themoviedb.org/3/';


  /**
   * @public
   * @property CONFIG_URL
   * @type {string}
   * @memberof MoviedbApiService
   */
  public CONFIG_URL      = 'https://api.themoviedb.org/3/configuration?';


  /**
   * @private
   * @property API_KEY
   * @type {string}
   * @memberof MoviedbApiService
   */
  private API_KEY: string = environment.keys.api.movieDb;


  /**
   * @constructor
   * Creates an instance of MoviedbApiService.
   * @param {HttpClient} http
   * @memberof MoviedbApiService
   */
  constructor(private http: HttpClient) { }


  /**
   * @public
   * @method getConfiguration
   * @description     Returns commonly used configuration data from the MovieDB API
   * @returns {Observable<any>}
   * @memberof MoviedbApiService
   */
  public getConfiguration(): Observable<any> {
    return this.http.get(`${this.CONFIG_URL}api_key=${this.API_KEY}`);
  }


  /**
   * @public
   * @method getMovieGenres
   * @description     Returns a list of movies genres from the MovieDB API
   * @returns {Observable<any>}
   * @memberof MoviedbApiService
   */
  public getMovieGenres(): Observable<any> {
    return this.http.get(`${this.API_URL}genre/movie/list?api_key=${this.API_KEY}`);
  }


  /**
   * @public
   * @method getMoviesBySearchTitle
   * @param {string} searchTerm
   * @description     Returns a list of movies that match a specified search term from the MovieDB API
   * @returns {Observable<any>}
   * @memberof MoviedbApiService
   */
  public getMoviesBySearchTitle(searchTerm: string): Observable<any> {
    return this.http.get(`${this.API_URL}search/movie?api_key=${this.API_KEY}&query=${searchTerm}`);
  }


  /**
   * @public
   * @method getMovieCredits
   * @param {number} movieId
   * @description     Returns a list of credits for a specified movie from the MovieDB API
   * @returns {Observable<any>}
   * @memberof MoviedbApiService
   */
  public getMovieCredits(movieId: number): Observable<any> {
    return this.http.get(`${this.API_URL}movie/${movieId}/credits?api_key=${this.API_KEY}`);
  }

}
