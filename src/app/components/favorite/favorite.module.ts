import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FavoriteComponent } from './favorite.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [FavoriteModule.rootComponent],
  imports: [CommonModule, FontAwesomeModule, FontAwesomeModule, IonicModule],
  exports: [FavoriteModule.rootComponent],
  entryComponents: [FavoriteModule.rootComponent],
})
export class FavoriteModule {
  static rootComponent = FavoriteComponent;
}
