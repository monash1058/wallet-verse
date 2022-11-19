import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.page.html',
  styleUrls: ['./otp-verify.page.scss'],
})
export class OtpVerifyPage implements OnInit {
  emailEnable: boolean = false;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.emailEnable = true;
     }, 30000);
  }

}
