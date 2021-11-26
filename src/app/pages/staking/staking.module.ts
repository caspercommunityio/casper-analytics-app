import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StakingPageRoutingModule } from './staking-routing.module';

import { StakingPage } from './staking.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FavoriteModule } from '../../components/favorite/favorite.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StakingPageRoutingModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    FavoriteModule
  ],
  declarations: [StakingPage]
})
export class StakingPageModule { }
