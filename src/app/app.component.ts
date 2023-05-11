import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { CommonService } from './shared/service/common.service';
import { FcmService } from './shared/service/fcm.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loadingSpninerHide = true;
  constructor(
    private commonSer: CommonService,
    private cdRef: ChangeDetectorRef,
    private _location: Location,
    private fcmService: FcmService,
    public alertController: AlertController,
    private platform: Platform
  ) {
    this.initializeApp()
    this.fcmService.initPush()
  }

  ngOnInit(): void {
    this.commonSer.loadingSpinner.subscribe((data: boolean) => {
      this.loadingSpninerHide = data;
      this.cdRef.detectChanges();
      // setTimeout(() => {                          
        
      // }, 3000);
     
    });
  }

  initializeApp() {

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/admin/tab-nav/dashboard')) {

        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else {

        // Navigate to back page
        console.log('Navigate to back page');
        this._location.back();

      }

    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e)
      })
    });

  }

  showExitConfirm() {
    this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }
}
