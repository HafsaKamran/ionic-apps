import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KingForADayPageRoutingModule } from './king-for-a-day-routing.module';

import { KingForADayPage } from './king-for-a-day.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KingForADayPageRoutingModule
  ],
  declarations: [KingForADayPage]
})
export class KingForADayPageModule {}
