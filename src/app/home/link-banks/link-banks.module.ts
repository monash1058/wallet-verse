import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkBanksPageRoutingModule } from './link-banks-routing.module';

import { LinkBanksPage } from './link-banks.page';
import { NgxPaymentCardModule } from 'ngx-payment-card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkBanksPageRoutingModule,
    NgxPaymentCardModule
  ],
  declarations: [LinkBanksPage]
})
export class LinkBanksPageModule {}
