import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidatorsPageRoutingModule } from './validators-routing.module';

import { ValidatorsPage } from './validators.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BlocInfoModule } from '../../components/bloc-info/bloc-info.module';
import { ChartInfoModule } from '../../components/chart-info/chart-info.module';
import { SwiperModule } from 'swiper/angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidatorsPageRoutingModule,
    FontAwesomeModule,
    NgxDatatableModule,
    NgxSpinnerModule,
    BlocInfoModule,
    SwiperModule,
    ChartInfoModule
  ],
  declarations: [ValidatorsPage]
})
export class ValidatorsPageModule { }
