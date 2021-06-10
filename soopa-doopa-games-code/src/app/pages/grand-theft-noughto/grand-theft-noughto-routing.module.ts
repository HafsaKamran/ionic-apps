import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrandTheftNoughtoPage } from './grand-theft-noughto.page';

const routes: Routes = [
  {
    path: '',
    component: GrandTheftNoughtoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrandTheftNoughtoPageRoutingModule {}
