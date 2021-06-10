import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HappyFamiliesPageRoutingModule } from './happy-families-routing.module';

import { HappyFamiliesPage } from './happy-families.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HappyFamiliesPageRoutingModule
  ],
  declarations: [HappyFamiliesPage]
})
export class HappyFamiliesPageModule {}
