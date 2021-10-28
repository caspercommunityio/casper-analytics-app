import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsPage } from './notifications.page';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing'
describe('NotificationsPage', () => {
  let component: NotificationsPage;
  let fixture: ComponentFixture<NotificationsPage>;

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  beforeEach(waitForAsync(() => {
    console.log("beforeeach 1")
    TestBed.configureTestingModule({
      declarations: [NotificationsPage],
      imports: [IonicModule.forRoot(), HttpClientModule, AngularFireModule.initializeApp(environment.firebaseWebNotifications), RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(NotificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.clearSubscriptions();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
