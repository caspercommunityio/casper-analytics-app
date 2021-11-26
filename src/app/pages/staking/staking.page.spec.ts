import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StakingPage } from './staking.page';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('StakingPage', () => {
  let component: StakingPage;
  let fixture: ComponentFixture<StakingPage>;

  beforeEach(waitForAsync(() => {
    let mockActivatedRoute: any = { snapshot: { paramMap: convertToParamMap({ 'validator': '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b' }) } };

    TestBed.configureTestingModule({
      declarations: [StakingPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientModule],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }]
    }).compileComponents();

    fixture = TestBed.createComponent(StakingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
