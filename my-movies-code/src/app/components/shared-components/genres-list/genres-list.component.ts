/**
 * GenresListComponent
 *
 * @author James Griffiths
 * @date 20/05/2020
 * @version 0.1
 * @export
 * @class GenresListComponent
 * @packageDocumentation
 */
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.scss'],
})
export class GenresListComponent implements OnInit {


  /**
   * @public
   * @property searches
   * @type {Array<any>}
   * @memberof GenresListComponent
   */
  @Input() searches: Array<any>;


  /**
   * @public
   * @property chosenGenre
   * @type {EventEmitter<string>}
   * @memberof GenresListComponent
   */
  @Output() chosenGenre = new EventEmitter<string>();


  /**
   * @public
   * @property selectedGenre
   * @type {string}
   * @memberof GenresListComponent
   */
  public selectedGenre: string;


  /**
   * @public
   * @property filtersObj$
   * @type {Observable<any>}
   * @memberof GenresListComponent
   */
  public filtersObj$: Observable<any>;


  /**
   * @constructor
   * Creates an instance of GenresListComponent.
   * @memberof GenresListComponent
   */
  constructor() { }


  /**
   * @method ngOnInit
   * @description   Angular lifecycle hook - triggered once on component initialisation.
   *                Here we filter the supplied searches from the component @Input(), push
   *                those into an array and braodcast as an observable for the component
   *                template view to render
   * @memberof GenresListComponent
   */
  ngOnInit() {
    this.filterGenres();
  }


  /**
   * @private
   * @method filterGenres
   * @description   Filters the supplied searches from the component @Input(), pushes
   *                those into an array and braodcast as an observable for the component
   *                template view to render
   * @memberof GenresListComponent
   */
  private filterGenres(): void {
    const genres = [];
    this.searches.filter(item => {
      item.genres.filter(genre => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
    });
    this.filtersObj$ = of(genres);
  }


  /**
   * @public
   * @method filterMoviesByselectedGenre
   * @param {*} ev
   * @description       Broadcasts a selected genre for the parent component to 'listen' to
   *                    (and subsequently filter the displayed set of movies based on that
   *                     specific genre)
   * @memberof GenresListComponent
   */
  public filterMoviesByselectedGenre(ev: any): void {
    this.chosenGenre.emit(ev.detail.value);
  }

}
