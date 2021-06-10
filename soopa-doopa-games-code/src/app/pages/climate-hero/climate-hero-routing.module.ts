import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClimateHeroPage } from './climate-hero.page';

const routes: Routes = [
  {
    path: '',
    component: ClimateHeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClimateHeroPageRoutingModule {}
