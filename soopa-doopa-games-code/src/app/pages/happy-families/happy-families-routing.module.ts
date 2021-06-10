import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HappyFamiliesPage } from './happy-families.page';

const routes: Routes = [
  {
    path: '',
    component: HappyFamiliesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HappyFamiliesPageRoutingModule {}
