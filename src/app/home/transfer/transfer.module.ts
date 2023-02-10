import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferPageRoutingModule } from './transfer-routing.module';

import { TransferPage } from './transfer.page';
import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferPageRoutingModule
  ],
  declarations: [TransferPage, FilterPipe]
})
export class TransferPageModule {}
