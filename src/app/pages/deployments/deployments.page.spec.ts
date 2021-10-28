import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { DeploymentsPage } from './deployments.page';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
describe('DeploymentsPage', () => {
  let component: DeploymentsPage;
  let fixture: ComponentFixture<DeploymentsPage>;

  beforeEach(waitForAsync(() => {
    let mockActivatedRoute: any = { snapshot: { paramMap: convertToParamMap({ 'validator': '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b' }) } };

    TestBed.configureTestingModule({
      declarations: [DeploymentsPage],
      imports: [IonicModule.forRoot(), HttpClientModule, RouterTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }]
    }).compileComponents();

    fixture = TestBed.createComponent(DeploymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
