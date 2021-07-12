/**
 * SavedSearchesListComponent
 *
 * @author James Griffiths
 * @date 20/05/2020
 * @version 0.1
 * @export
 * @class SavedSearchesListComponent
 * @packageDocumentation
 */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { SelectedSavedSearchListenerService } from '../../../services/selected-saved-search-listener.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-saved-searches-list',
  templateUrl: './saved-searches-list.component.html',
  styleUrls: ['./saved-searches-list.component.scss'],
})
export class SavedSearchesListComponent implements OnInit {


  /**
   * @public
   * @type keysObj$
   * @type {Observable<any>}
   * @memberof SavedSearchesListComponent
   */
  public keysObj$: Observable<any>;


  /**
   * @constructor
   * Creates an instance of SavedSearchesListComponent.
   * @param {StorageService} storage
   * @param {SelectedSavedSearchListenerService} selectedSavedSearch
   * @param {ModalController} modal
   * @memberof SavedSearchesListComponent
   */
  constructor(private storage: StorageService,
              private selectedSavedSearch: SelectedSavedSearchListenerService,
              private modal: ModalController) { }


  /**
   * @method ngOnInit
   * @description     Angular lifecycle hook - triggered only once upon component initialisation
   *                  Here we retrieve all existing Ionic Storage keys and - if any exist - we
   *                  publish the list of saved keys as an observable which the component template
   *                  parses and renders as a list.
   *                  This will be keys that relate to different movie searches that the user may
   *                  have saved.
   * @memberof SavedSearchesListComponent
   */
  ngOnInit() {
    const storageKeys = this.storage.keys();
    this.keysObj$ = from(storageKeys)
    .pipe(
      map(val => {
        if (val.hasOwnProperty('keys')) {
          const index = val.keys.findIndex(key => key === 'MyFavouriteMovies');

          const keysObj = val.keys;
          if (index !== -1) {
            keysObj.splice(index, 1);
          }
          const keys = keysObj.map((key: any) => {
            return {
              id: key,
              name: key.replace(/-/g, ' ')
            };
          });
          return keys;
        } else {
          return [];
        }
      })
    );
  }


  /**
   * @public
   * @method selectSearch
   * @param {*} key
   * @description     Broadcasts a selected saved search for components that may be listening to
   *                  parse the movies (in that saved search) and display in their template view
   * @memberof SavedSearchesListComponent
   * @returns {none}
   */
  public selectSearch(key: any): void {
    this.storage.get(key.id)
    .then((movies: any) => {
      const data = {
        name: key.name,
        data: movies
      };
      this.selectedSavedSearch.resultToBeParsed(data);
      this.modal.dismiss();
    })
    .catch((error: any) => {
      // Maybe you would like to implement error handling? :)
    });
  }


}
