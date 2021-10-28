import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ValidatorsPage } from './validators.page';
import { RouterTestingModule } from '@angular/router/testing';
import { CasperService } from '../../api/casper.service';
describe('ValidatorsPage', () => {
  let component: ValidatorsPage;
  let fixture: ComponentFixture<ValidatorsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ValidatorsPage],
      imports: [IonicModule.forRoot(), HttpClientModule, RouterTestingModule],
      providers: [CasperService]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidatorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
