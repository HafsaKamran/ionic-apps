import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlphaMalePage } from './alpha-male.page';

const routes: Routes = [
  {
    path: '',
    component: AlphaMalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlphaMalePageRoutingModule {}
