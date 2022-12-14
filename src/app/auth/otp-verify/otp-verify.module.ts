import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpVerifyPageRoutingModule } from './otp-verify-routing.module';

import { OtpVerifyPage } from './otp-verify.page';
import { CodeInputModule } from 'angular-code-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpVerifyPageRoutingModule,
    CodeInputModule
  ],
  declarations: [OtpVerifyPage]
})
export class OtpVerifyPageModule {}
