import { Component, Input, OnInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'modal-manage-notification-page',
  templateUrl: './modal-manage-notification.page.html',
  styleUrls: ['./modal-manage-notification.page.scss']
})


export class ModalManageNotificationPage {
  @Input() notification: any;
  @Input() validators: any;
  @Input() delegators: any;
  @Input() selectedAlert: any;
  @Input() isNew: any;

  selectedValidator: any;
  selectedDelegator: any;
  selectedPercentage: any;
  selectedEraWhen: any;

  alerts: any[] = [
    {
      "name": "new_delegation",
      "label": "A new delegation occurs"
    },
    {
      "name": "new_undelegation",
      "label": "A new undelegation occurs"
    },
    {
      "name": "validator_down",
      "label": "A validator is down"
    },
    {
      "name": "delegators_change",
      "label": "The number of delegators change"
    },
    {
      "name": "casper_pump",
      "label": "Casper pump over a specified percentage"
    },
    {
      "name": "casper_dump",
      "label": "Casper dump over a specified percentage"
    },
    {
      "name": "fees_change",
      "label": "A validator changes his delegation rate"
    },
    {
      "name": "rewards",
      "label": "Overview of the rewards earned"
    }
  ]

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
    console.log("on init");
    if (this.notification.condition.parameters.percentage !== undefined) {
      this.selectedPercentage = this.notification.condition.parameters.percentage;
    }
    if (this.notification.condition.parameters.validator !== undefined) {
      this.selectedValidator = { "publicKey": this.notification.condition.parameters.validator }
    }
    if (this.notification.condition.parameters.delegator !== undefined) {
      this.selectedDelegator = { "publicKey": this.notification.condition.parameters.delegator }
    }
    if (this.notification.condition.parameters.eraWhen !== undefined) {
      this.selectedEraWhen = this.notification.condition.parameters.eraWhen;
    }
  }

  validatorChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.notification.condition.parameters.validator = event.value.publicKey;

  }
  delegatorChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.notification.condition.parameters.delegator = event.value.publicKey;

  }

  updateNotification() {
    if (this.notification.condition.function == "casper_pump" || this.notification.condition.function == "casper_dump") {
      this.notification.condition.parameters.percentage = this.selectedPercentage;
    }
    if (this.notification.condition.parameters.validator !== undefined) {
      this.notification.condition.parameters.validator = this.selectedValidator.publicKey;
    }
    if (this.notification.condition.function == "rewards") {
      if (this.selectedDelegator !== undefined) {

        this.notification.condition.parameters.delegator = this.selectedDelegator.publicKey;
      }
      if (this.selectedEraWhen !== undefined) {

        this.notification.condition.parameters.eraWhen = this.selectedEraWhen;
      }
    }
  }

  alertChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.notification.condition.function = event.value.name;
  }

  dismissModal(saveData: boolean) {
    this.updateNotification();

    this.modalController.dismiss({
      'dismissed': true,
      'saveData': saveData,
      'notification': this.notification
    });
  }

}
