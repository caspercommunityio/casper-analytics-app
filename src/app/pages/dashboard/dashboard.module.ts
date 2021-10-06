import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ChartsModule } from 'ng2-charts';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardInfoModule } from '../../components/card-info/card-info.module';
import { BlocInfoModule } from '../../components/bloc-info/bloc-info.module';
import { FavoriteModule } from '../../components/favorite/favorite.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SwiperModule } from 'swiper/angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ChartsModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    BlocInfoModule,
    FavoriteModule,
    CardInfoModule,
    SwiperModule,
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule { }
