import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlphaMalePageRoutingModule } from './alpha-male-routing.module';

import { AlphaMalePage } from './alpha-male.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlphaMalePageRoutingModule
  ],
  declarations: [AlphaMalePage]
})
export class AlphaMalePageModule {}
