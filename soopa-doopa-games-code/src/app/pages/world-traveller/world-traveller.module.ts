import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorldTravellerPageRoutingModule } from './world-traveller-routing.module';

import { WorldTravellerPage } from './world-traveller.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorldTravellerPageRoutingModule
  ],
  declarations: [WorldTravellerPage]
})
export class WorldTravellerPageModule {}
