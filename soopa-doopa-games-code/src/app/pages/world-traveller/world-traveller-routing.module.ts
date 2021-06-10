import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorldTravellerPage } from './world-traveller.page';

const routes: Routes = [
  {
    path: '',
    component: WorldTravellerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorldTravellerPageRoutingModule {}
