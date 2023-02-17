import { Component, OnInit } from '@angular/core';
import { FcmService } from '../shared/service/fcm.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private fcmService: FcmService) {
    // this.fcmService.initPush(); 
  }

  ngOnInit() {
  }

}
