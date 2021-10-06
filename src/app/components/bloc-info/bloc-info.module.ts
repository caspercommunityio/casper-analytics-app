import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BlocInfoComponent } from './bloc-info.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [BlocInfoModule.rootComponent],
  imports: [CommonModule, FontAwesomeModule, IonicModule, RouterModule],
  exports: [BlocInfoModule.rootComponent],
  entryComponents: [BlocInfoModule.rootComponent],
})
export class BlocInfoModule {
  static rootComponent = BlocInfoComponent
}
