import { Component, OnInit } from '@angular/core';
import { CasperService } from '../../api/casper.service';
import { NgxSpinnerService } from "ngx-spinner";
import { interval } from 'rxjs';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalManageNotificationPage } from './modal/modal-manage-notification.page';
import { MessagingWebService } from '../../services/messaging-web.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifications: any = [];
  validatorsList: any;
  delegatorsList: any;

  isNotificationEnabled = true;

  intervalSubscription: any = undefined;

  bgColors = {
    "new_delegation": "#badc58",
    "validator_down": "#fbc658",
    "new_undelegation": "#ef8157",
    "fees_change": "#51cbce",
    "delegators_change": "#6bd098",
    "new": "#48dbfb",
    "test": "#95afc0",
    "casper_pump": "#f17e5d",
    "casper_dump": "#7ed6df",
    "rewards": "#38ada9"
  }
  labels = {
    "new_delegation": "New Delegation",
    "validator_down": "Validator Down",
    "new_undelegation": "New Undelegation",
    "fees_change": "Fees Change",
    "delegators_change": "Delegators Change",
    "test": "Test alert",
    "casper_pump": "Casper pump",
    "casper_dump": "Casper dump",
    "rewards": "Rewards"
  }
  descriptions = {
    "new_delegation": "Send an alert when a new delegation occurs to a validator",
    "validator_down": "Send an alert when a validator is down.",
    "new_undelegation": "Send an alert when a new undelegation occurs to a validator",
    "fees_change": "Send an alert when the delegation rate of a validator changes",
    "delegators_change": "Send an alert when the number of delegators change over an era",
    "test": "Send a test alert",
    "casper_pump": "Send an alert when CSPR pump over a specified percentage",
    "casper_dump": "Send an alert when CSPR dump over a specified percentage",
    "rewards": "Send an alert with the amount of rewards earned"
  }

  constructor(private casper: CasperService, private spinner: NgxSpinnerService, private modalController: ModalController, private toastController: ToastController, private messagingWebService: MessagingWebService) { }

  ngOnInit() {
    this.casper.getValidatorsList().subscribe((validatorsList) => {
      this.validatorsList = validatorsList;
    })
    this.casper.getDelegatorsList().subscribe((delegatorsList) => {
      this.delegatorsList = delegatorsList;
    })
    this.spinner.show();
    //Delay to run the request to be sure that we get the notification token
    this.intervalSubscription = interval(3000).pipe(
      mergeMap(() => this.casper.getNotificationToken()),
      map((token) => {
        if (token === null) {
          this.isNotificationEnabled = false;
        } else {
          this.isNotificationEnabled = true;
        }
      }),
      mergeMap(() => this.casper.getNotifications()),
      map((notifications) => {
        this.spinner.hide();

        //Update content (to prevent screen flickering)
        notifications.map(x => {
          let existsInArray = this.notifications.filter((y: any) => x.id == y.id);
          existsInArray.map((localNotification: any) => {
            localNotification.lastExecution = x.lastExecution;
            localNotification.condition = x.condition;
          })
          if (existsInArray.length === 0) {
            this.notifications.push(x);
          }
        })

        //Remove deleted notifications
        this.notifications.map((x, index) => {
          let existsInArray = notifications.filter(y => y.id == x.id);
          if (existsInArray.length === 0) {
            this.notifications.splice(index, 1);
          }
        })
      })

    ).subscribe()

  }

  async editNotification(notification: any) {
    let isNew: boolean = false;
    if (notification.condition === undefined) {
      notification.notificationToken = "";
      notification.condition = {
        function: "",
        parameters: {
          validator: ""
        }
      }
      isNew = true;
    }
    const modal = await this.modalController.create({
      component: ModalManageNotificationPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'notification': notification,
        'validators': this.validatorsList,
        'delegators': this.delegatorsList,
        'selectedAlert': { "name": notification.condition.function },
        'isNew': isNew
      },
      showBackdrop: true,
      backdropDismiss: false
    });
    modal.onDidDismiss().then((d: any) => {
      if (d.data.saveData) {
        this.casper.postNotification(d.data.notification).subscribe((r: any) => {
          if (!r.error) {
            this.showToastMessage('Notification successfully saved.');
          } else {
            this.showToastMessage('There is a problem while saving the notification.');
          }
        })
      }
    });

    return await modal.present();
  }

  async deleteNotification(notification: any) {
    this.casper.deleteNotification(notification).subscribe((r: any) => {
      if (!r.error) {
        this.showToastMessage('Notification successfully deleted.');
      } else {
        this.showToastMessage('There is a problem while deleting the notification.');
      }
    });
  }

  async showToastMessage(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  clearSubscriptions() {
    console.log("unsubscribe");
    if (this.intervalSubscription !== undefined) {
      this.intervalSubscription.unsubscribe();
    }
  }

}
