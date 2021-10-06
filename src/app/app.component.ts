import { Component } from '@angular/core';
import { CasperService } from './api/casper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { environment } from '../environments/environment';
import { MessagingWebService } from './services/messaging-web.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public isValidatorSelected = true;
  public selectedValidator = "";
  ios: boolean;

  public appPages = [];

  constructor(private platform: Platform, private casperService: CasperService, private router: Router, private activatedRoute: ActivatedRoute, private menuController: MenuController, private messagingWebService: MessagingWebService, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.ios = platform.is('ios');
    router.events.subscribe((val: any) => {
      if (router.url != "/" && router.url != "/validators" && router.url != "/notifications") {
        this.isValidatorSelected = true;
        this.selectedValidator = router.url.split("/")[2];
        this.menuController.enable(true);
        this.refreshMenu();
      } else {
        this.menuController.enable(false);
        this.isValidatorSelected = false;
        this.selectedValidator = "";
        this.appPages = [];
      }
    });
  }

  refreshMenu() {
    this.appPages = [
      { title: 'Dashboard', url: '/dashboard/' + this.selectedValidator },
      { title: 'Details', url: '/validator/' + this.selectedValidator },
      { title: 'Infos', url: '/infos/' + this.selectedValidator },
      { title: 'Deployments', url: '/deployments/' + this.selectedValidator },
      { title: 'Calculator', url: '/calculator/' + this.selectedValidator }
    ];
  }
  listenForMessages() {
    this.messagingWebService.getMessages().subscribe(async (msg: any) => {
      const alert = await this.alertCtrl.create({
        header: msg.notification.title,
        subHeader: msg.notification.body,
        message: (msg.data ? msg.data.info : ''),
        buttons: ['OK'],
      });

      await alert.present();
    });
  }

  requestPermission() {
    this.messagingWebService.requestPermission().subscribe(
      async token => {
        this.casperService.setNotificationToken(token);
        this.casperService.postRegisterToken(token).subscribe();
      },
      async (err) => {
      }
    );
  }

  async deleteToken() {
    this.messagingWebService.deleteToken();
    this.casperService.setNotificationToken(null);
  }
  async ngOnInit() {


    if (this.platform.is("hybrid")) {
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          PushNotifications.register();
        } else {
        }
      });

      PushNotifications.addListener('registration',
        (token: Token) => {
          this.casperService.setNotificationToken(token.value);
          this.casperService.postRegisterToken(token.value).subscribe();
        }
      );

      PushNotifications.addListener('registrationError',
        (error: any) => {
        }
      );

      PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotificationSchema) => {
        }
      );

      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
        }
      );
    } else {
      this.requestPermission();
      this.listenForMessages();
    }

  }
}
