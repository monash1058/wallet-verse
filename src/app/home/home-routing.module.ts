import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tab-nav',
    component: HomePage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'transfer',
        loadChildren: () => import('./transfer/transfer.module').then(m => m.TransferPageModule)
      },
      {
        path: 'wallet',
        loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'link-banks',
        loadChildren: () => import('./link-banks/link-banks.module').then( m => m.LinkBanksPageModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('./transaction/transaction.module').then( m => m.TransactionPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tab-nav/dashboard'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
