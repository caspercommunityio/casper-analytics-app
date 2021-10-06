import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeploymentsPageRoutingModule } from './deployments-routing.module';

import { DeploymentsPage } from './deployments.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FavoriteModule } from '../../components/favorite/favorite.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeploymentsPageRoutingModule,
    NgxDatatableModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    FavoriteModule,
  ],
  declarations: [DeploymentsPage]
})
export class DeploymentsPageModule { }
