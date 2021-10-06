import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidatorPageRoutingModule } from './validator-routing.module';

import { ValidatorPage } from './validator.page';

import { ChartsModule } from 'ng2-charts';

import { BlocInfoModule } from '../../components/bloc-info/bloc-info.module';
import { CardInfoModule } from '../../components/card-info/card-info.module';
import { FavoriteModule } from '../../components/favorite/favorite.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidatorPageRoutingModule,
    ChartsModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    CardInfoModule,
    BlocInfoModule,
    FavoriteModule,
    SwiperModule,
  ],
  declarations: [ValidatorPage]
})
export class ValidatorPageModule { }
