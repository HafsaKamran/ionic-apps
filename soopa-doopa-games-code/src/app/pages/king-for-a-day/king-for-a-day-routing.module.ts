import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KingForADayPage } from './king-for-a-day.page';

const routes: Routes = [
  {
    path: '',
    component: KingForADayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KingForADayPageRoutingModule {}
