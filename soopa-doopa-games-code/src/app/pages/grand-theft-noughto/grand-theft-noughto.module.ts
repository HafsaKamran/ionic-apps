import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrandTheftNoughtoPageRoutingModule } from './grand-theft-noughto-routing.module';

import { GrandTheftNoughtoPage } from './grand-theft-noughto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrandTheftNoughtoPageRoutingModule
  ],
  declarations: [GrandTheftNoughtoPage]
})
export class GrandTheftNoughtoPageModule {}
