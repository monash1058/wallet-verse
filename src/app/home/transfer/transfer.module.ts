import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferPageRoutingModule } from './transfer-routing.module';

import { TransferPage } from './transfer.page';
import { TransferListComponent } from './transfer-list/transfer-list.component';
import { PayPhonesComponent } from './pay-phones/pay-phones.component';
import { FilterPipe } from './filter.pipe';
import { PayBankComponent } from './pay-bank/pay-bank.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferPageRoutingModule
  ],
  declarations: [TransferPage, TransferListComponent, PayPhonesComponent, FilterPipe, PayBankComponent]
})
export class TransferPageModule {}
