import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ModalManageNotificationPage } from './modal-manage-notification.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    IonicSelectableModule
  ],
  declarations: [ModalManageNotificationPage]
})
export class ModalManageNotificationPageModule { }
