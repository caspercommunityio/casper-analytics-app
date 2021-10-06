import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChartInfoComponent } from './chart-info.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ChartInfoModule.rootComponent],
  imports: [CommonModule, FontAwesomeModule, IonicModule, RouterModule, ChartsModule],
  exports: [ChartInfoModule.rootComponent],
  entryComponents: [ChartInfoModule.rootComponent],
})
export class ChartInfoModule {
  static rootComponent = ChartInfoComponent
}
