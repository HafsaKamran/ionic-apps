/**
 * MovieComponent
 *
 * @author James Griffiths
 * @date 20/05/2020
 * @version 0.1
 * @export
 * @class MovieComponent
 * @packageDocumentation
 */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FavouriteMoviesService } from '../../../services/favourite-movies.service';
import { MoviesListenerService } from '../../../services/movies-listener.service';
import { MovieCreditsComponent } from '../movie-credits/movie-credits.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {


  /**
   * @public
   * @property section
   * @type {string}
   * @memberof MovieComponent
   */
  @Input() section: string;


  /**
   * @public
   * @property film
   * @type {*}
   * @memberof MovieComponent
   */
  @Input() film: any;


  /**
   * @public
   * @property config
   * @type {*}
   * @memberof MovieComponent
   */
  @Input() config: any;


  /**
   * @private
   * @property parsedMovies
   * @type {Array<any>}
   * @memberof MovieComponent
   */
  private parsedMovies = [];


  /**
   * @constructor
   * Creates an instance of MovieComponent.
   * @param {FavouriteMoviesService} favourites
   * @param {MoviesListenerService} moviesListener
   * @param {ModalController} modal
   * @memberof MovieComponent
   */
  constructor(private favourites: FavouriteMoviesService,
              private moviesListener: MoviesListenerService,
              private modal: ModalController) { }


  /**
   * @method ngOnInit
   * @description   Angular lifecycle hook - triggered once on component initialisation
   *                Here we subscribe to the MovieListener service
   * @memberof MovieComponent
   * @returns {none}
   */
  ngOnInit() {
    this.moviesListener.resultListener$.subscribe((data: Array<any>) => {
      this.parsedMovies = [...data];
    });
  }


  /**
   * @public
   * @method saveAsFavourite
   * @param {*} movie
   * @description       Saves a selected movie as a favourite
   * @memberof MovieComponent
   * @returns {none}
   */
  public saveAsFavourite(movie: any): void {
    this.favourites
    .doesItemAlreadyExistInFavourites(movie.id, movie)
    .subscribe();
  }


  /**
   * @public
   * @method moreInformation
   * @param {*} movie
   * @description     Launches a modal window to display the cast/crew credits for the selected movie
   * @memberof MovieComponent
   * @returns {none}
   */
  public moreInformation(movie: any): void {
    this.launchModal(movie.id);
  }


  /**
   * @private
   * @async
   * @method launchModal
   * @param {number} id
   * @description     Creates a ModalController window - using the MovieCreditsComponent as its content
   *                  This is where all cast/crew credits for the selected movie will be displayed.
   * @returns {Promise<any>}
   * @memberof MovieComponent
   */
  private async launchModal(id: number): Promise<any> {
    const wind = await this.modal.create({
      component: MovieCreditsComponent,
      componentProps: {
        id,
        config: this.config.images.base_url + this.config.images.profile_sizes[2]
      }
    });
    return await wind.present();
  }


  /**
   * @public
   * @method remove
   * @param {*} movie
   * @description     Removes a selected movie
   * @memberof MovieComponent
   * @returns {none}
   */
  public remove(movie: any): void {
    const id = movie.id;
    this.parsedMovies = this.parsedMovies.filter(item => item.id !== id);
    this.moviesListener.moviesToBeParsed(this.parsedMovies);
  }

}
