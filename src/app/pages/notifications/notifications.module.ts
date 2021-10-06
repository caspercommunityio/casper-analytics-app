import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsPageRoutingModule } from './notifications-routing.module';

import { NotificationsPage } from './notifications.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalManageNotificationPageModule } from './modal/modal-manage-notification.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    ModalManageNotificationPageModule
  ],
  declarations: [NotificationsPage]
})
export class NotificationsPageModule { }
