import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CardInfoComponent } from './card-info.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [CardInfoModule.rootComponent],
  imports: [CommonModule, FontAwesomeModule, FontAwesomeModule, IonicModule],
  exports: [CardInfoModule.rootComponent],
  entryComponents: [CardInfoModule.rootComponent],
})
export class CardInfoModule {
  static rootComponent = CardInfoComponent
}
