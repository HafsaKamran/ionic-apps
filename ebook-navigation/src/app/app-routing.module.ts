import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
  { 
      path: 'details',
      loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule),
      data: { arr : [
          'Mastering Ionic : The definitive guide',
          'Mastering Ionic : Building a real world application',
          'Mastering Ionic : Developing Firebase applications'
      ]}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }