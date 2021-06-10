import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MovieCreditsComponent } from './movie-credits/movie-credits.component';
import { SavedSearchesListComponent } from './saved-searches-list/saved-searches-list.component';
import { GenresListComponent } from './genres-list/genres-list.component';
import { MovieComponent } from './movie/movie.component';



@NgModule({
  declarations: [MovieCreditsComponent, SavedSearchesListComponent, MovieComponent, GenresListComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  entryComponents: [
    MovieCreditsComponent,
    SavedSearchesListComponent,
    MovieComponent,
    GenresListComponent
  ],
  exports: [
    MovieCreditsComponent,
    SavedSearchesListComponent,
    MovieComponent,
    GenresListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedComponentsModule { }
