/**
 * MovieCreditsComponent
 *
 * @author James Griffiths
 * @date 20/05/2020
 * @version 0.1
 * @export
 * @class MovieCreditsComponent
 * @packageDocumentation
 */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { MoviedbApiService } from '../../../services/moviedb-api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-movie-credits',
  templateUrl: './movie-credits.component.html',
  styleUrls: ['./movie-credits.component.scss'],
})
export class MovieCreditsComponent implements OnInit {


  /**
   * @property content
   * @type {IonContent}
   * @memberof MovieCreditsComponent
   */
  @ViewChild(IonContent) content: IonContent;


  /**
   * @public
   * @property id
   * @type {number}
   * @memberof MovieCreditsComponent
   */
  @Input() id: number;


  /**
   * @public
   * @property config
   * @type {string}
   * @memberof MovieCreditsComponent
   */
  @Input() config: string;


  /**
   * @public
   * @property creditsObj
   * @type {Observable<any>}
   * @memberof MovieCreditsComponent
   */
  public creditsObj: Observable<any>;


  /**
   * @public
   * @property panels
   * @type {Array<string>}
   * @memberof MovieCreditsComponent
   */
  public panels: Array<string> = ['Cast', 'Crew'];


  /**
   * @constructor
   * Creates an instance of MovieCreditsComponent.
   * @param {MoviedbApiService} movies
   * @memberof MovieCreditsComponent
   */
  constructor(private movies: MoviedbApiService) { }


  /**
   * @method ngOnInit
   * @description       Angular lifecycle hook - triggered once on component initialisation
   *                    Here we parse movie credits retrieved from the MoviesDB API service
   *                    and render those to the component template
   * @memberof MovieCreditsComponent
   * @returns {none}
   */
  ngOnInit() {
    this.creditsObj = this.movies
    .getMovieCredits(this.id)
    .pipe(
      map((data: any) => {
        const arr = [];
        const cast = data.cast.map((member: any) => {
          const profileImage = (member.profile_path !== null) ? this.config + member.profile_path : null;
          return {
            cast_id: member.cast_id,
            character: member.character,
            credit_id: member.credit_id,
            gender: member.gender,
            id: member.id,
            name: member.name,
            order: member.order,
            profile_path: profileImage
          };
        });

        const crew = data.crew.map((member: any) => {
          const profileImage = (member.profile_path !== null) ? this.config + member.profile_path : null;
          return {
            credit_id: member.credit_id,
            department: member.department,
            gender: member.gender,
            id: member.id,
            job: member.job,
            name: member.name,
            profile_path: profileImage
          };
        });

        arr.push({
          cast,
          crew
        });
        return arr;
      })
    );
  }


  /**
   * @public
   * @method scrollToListSection
   * @param {string} name
   * @description     Scrolls the content to the specified section
   * @memberof MovieCreditsComponent
   * @returns {none}
   */
  public scrollToListSection(name: string): void {
    const anchor = document.getElementById(name.toLowerCase());
    if (name === 'Cast') {
      this.content.scrollToPoint(0, anchor.offsetTop, 1000);
    } else {
      this.content.scrollToPoint(0, anchor.offsetTop, 750);
    }
  }


  /**
   * @public
   * @method scrollToTop
   * @description     Scrolls the content to the top of the template view
   * @memberof MovieCreditsComponent
   * @returns {none}
   */
  public scrollToTop(): void {
    this.content.scrollToTop(1000);
  }

}
