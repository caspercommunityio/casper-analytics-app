import { TestBed } from '@angular/core/testing';

import { MessagingWebService } from './messaging-web.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environments/environment';
describe('MessagingWebService', () => {
  let service: MessagingWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      "imports": [AngularFireModule, AngularFireModule.initializeApp(environment.firebaseWebNotifications)]
    });
    service = TestBed.inject(MessagingWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
