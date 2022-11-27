import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayBankComponent } from './pay-bank/pay-bank.component';
import { PayPhonesComponent } from './pay-phones/pay-phones.component';
import { TransferListComponent } from './transfer-list/transfer-list.component';

import { TransferPage } from './transfer.page';

const routes: Routes = [
  { path: '', component: TransferPage,children:[
    {path:'', redirectTo:'list'},
    {path: 'list', component: TransferListComponent},
    {path: 'pay-phone', component: PayPhonesComponent},
    {path: 'pay-bank', component: PayBankComponent},
   
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferPageRoutingModule {}
