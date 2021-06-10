import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClimateHeroPageRoutingModule } from './climate-hero-routing.module';

import { ClimateHeroPage } from './climate-hero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClimateHeroPageRoutingModule
  ],
  declarations: [ClimateHeroPage]
})
export class ClimateHeroPageModule {}
