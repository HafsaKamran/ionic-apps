import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IonContent, IonList, IonListHeader } from '@ionic/angular';
import { MoviedbApiService } from '../../services/moviedb-api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;


  @Input() id: number;


  @Input() config: string;


  public creditsObj: Observable<any>;


  public panels: Array<string> = ['Cast', 'Crew'];


  private castPos: number;


  private crewPos: number;


  constructor(private movies: MoviedbApiService) { }


  ngOnInit() {
    this.creditsObj = this.movies
    .getMovieCredits(this.id)
    .pipe(
      map((data: any) => {
        console.log('Returned credits');
        console.dir(data);
        console.log('Returned credits');
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


  public scrollToListSection(name: string): void {
    const anchor = document.getElementById(name.toLowerCase());
    if (name === 'Cast') {
      this.content.scrollToPoint(0, anchor.offsetTop, 1000);
    } else {
      this.content.scrollToPoint(0, anchor.offsetTop, 750);
    }
  }


  public scrollToTop(): void {
    this.content.scrollToTop(1000);
  }

}
