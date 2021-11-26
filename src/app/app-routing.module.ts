import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'validators',
    pathMatch: 'full'
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  {
    path: 'dashboard/:validator',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'infos/:validator',
    loadChildren: () => import('./pages/infos/infos.module').then(m => m.InfosPageModule)
  },
  {
    path: 'validator/:validator',
    loadChildren: () => import('./pages/validator/validator.module').then(m => m.ValidatorPageModule)
  },
  {
    path: 'calculator/:validator',
    loadChildren: () => import('./pages/calculator/calculator.module').then(m => m.CalculatorPageModule)
  },
  {
    path: 'deployments/:validator',
    loadChildren: () => import('./pages/deployments/deployments.module').then(m => m.DeploymentsPageModule)
  },
  {
    path: 'validators',
    loadChildren: () => import('./pages/validators/validators.module').then(m => m.ValidatorsPageModule)
  },
  {
    path: 'infos',
    loadChildren: () => import('./pages/infos/infos.module').then(m => m.InfosPageModule)
  },
  {
    path: 'staking/:validator',
    loadChildren: () => import('./pages/staking/staking.module').then(m => m.StakingPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
