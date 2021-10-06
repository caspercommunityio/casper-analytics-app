import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidatorsPage } from './validators.page';

const routes: Routes = [
  {
    path: '',
    component: ValidatorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidatorsPageRoutingModule {}
