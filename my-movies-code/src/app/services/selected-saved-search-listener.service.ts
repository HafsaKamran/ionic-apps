/**
 * SelectedSavedSearchListenerService
 *
 * @author James Griffiths
 * @date 20/05/2020
 * @version 0.1
 * @export
 * @class SelectedSavedSearchListenerService
 * @packageDocumentation
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedSavedSearchListenerService {


  /**
   * @private
   * @property result
   * @type {BehaviorSubject<object>}
   * @memberof SelectedSavedSearchListenerService
   */
  private result: BehaviorSubject<object> = new BehaviorSubject<object>({});


  /**
   * @public
   * @property resultListener$
   * @type {Observable}
   * @memberof SelectedSavedSearchListenerService
   */
  public resultListener$: Observable<object>     = this.result.asObservable();


  /**
   * @constructor
   * Creates an instance of SelectedSavedSearchListenerService.
   * @memberof SelectedSavedSearchListenerService
   */
  constructor() { }


  /**
   * @public
   * @method resultToBeParsed
   * @param {Array<any>} search
   * @memberof SelectedSavedSearchListenerService
   * @description     'Emits' the observable state allowing components to subsequently subscribe to that
   * @returns {none}
   */
  public resultToBeParsed(search: object): void {
    this.result.next(search);
  }
}
