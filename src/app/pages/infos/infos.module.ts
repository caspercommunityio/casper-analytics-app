import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfosPageRoutingModule } from './infos-routing.module';

import { InfosPage } from './infos.page';

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
    BlocInfoModule,
    CardInfoModule,
    FavoriteModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    SwiperModule,
    InfosPageRoutingModule
  ],
  declarations: [InfosPage]
})
export class InfosPageModule { }
