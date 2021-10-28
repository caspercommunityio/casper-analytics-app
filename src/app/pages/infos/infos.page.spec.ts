import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing'
import { InfosPage } from './infos.page';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('InfosPage', () => {
  let component: InfosPage;
  let fixture: ComponentFixture<InfosPage>;

  beforeEach(waitForAsync(() => {
    let mockActivatedRoute: any = { snapshot: { paramMap: convertToParamMap({ 'validator': '012bac1d0ff9240ff0b7b06d555815640497861619ca12583ddef434885416e69b' }) } };

    TestBed.configureTestingModule({
      declarations: [InfosPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientModule],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }]
    }).compileComponents();

    fixture = TestBed.createComponent(InfosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
