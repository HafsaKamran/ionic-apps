import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'alpha-male',
    loadChildren: () => import('./pages/alpha-male/alpha-male.module').then( m => m.AlphaMalePageModule)
  },
  {
    path: 'climate-hero',
    loadChildren: () => import('./pages/climate-hero/climate-hero.module').then( m => m.ClimateHeroPageModule)
  },
  {
    path: 'grand-theft-noughto',
    loadChildren: () => import('./pages/grand-theft-noughto/grand-theft-noughto.module').then( m => m.GrandTheftNoughtoPageModule)
  },
  {
    path: 'happy-families',
    loadChildren: () => import('./pages/happy-families/happy-families.module').then( m => m.HappyFamiliesPageModule)
  },
  {
    path: 'king-for-a-day',
    loadChildren: () => import('./pages/king-for-a-day/king-for-a-day.module').then( m => m.KingForADayPageModule)
  },
  {
    path: 'world-traveller',
    loadChildren: () => import('./pages/world-traveller/world-traveller.module').then( m => m.WorldTravellerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
