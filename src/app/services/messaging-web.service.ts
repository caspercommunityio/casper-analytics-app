import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MessagingWebService {

  token = null;

  constructor(private afMessaging: AngularFireMessaging) { }

  requestPermission() {
    return this.afMessaging.requestToken.pipe(
      tap(token => {
      })
    );
  }

  getMessages() {
    return this.afMessaging.messages;
  }

  deleteToken() {
    if (this.token) {
      this.afMessaging.deleteToken(this.token);
      this.token = null;
    }
  }
}
