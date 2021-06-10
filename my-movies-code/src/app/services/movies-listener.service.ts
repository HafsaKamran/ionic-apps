/**
 * MoviesListenerService
 *
 * @author James Griffiths
 * @date 20/05/2020
 * @version 0.1
 * @export
 * @class MoviesListenerService
 * @packageDocumentation
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesListenerService {


  /**
   * @private
   * @property result
   * @type {BehaviorSubject<object>}
   * @memberof MoviesListenerService
   */
  private movies: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);


  /**
   * @public
   * @property resultListener$
   * @type {Observable}
   * @memberof MoviesListenerService
   */
  public resultListener$: Observable<Array<any>>     = this.movies.asObservable();


  /**
   * @constructor
   * Creates an instance of MoviesListenerService.
   * @memberof MoviesListenerService
   */
  constructor() { }


  /**
   * @public
   * @method moviesToBeParsed
   * @param {Array<any>} search
   * @memberof MoviesListenerService
   * @description     'Emits' the observable state allowing components to subsequently subscribe to that
   * @returns {none}
   */
  public moviesToBeParsed(movies: Array<any>): void {
    this.movies.next(movies);
  }
}
