import { LocationStrategy } from '@angular/common';
import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { TransferModalComponent } from 'src/app/shared/components/transfer-modal/transfer-modal.component';
import { ToastrCustomService } from 'src/app/shared/service/toastr.service';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  usersData: any;
  check = false;
  sendHistoryData: any[] = [];
  reciveHistoryData: any[] = [];
  users:any;
  goldData: number;
  goldValue: any;

  constructor(private actionSheetCtrl: ActionSheetController, private router : Router, private toastr: ToastrCustomService, private modalCtrl: ModalController,private location: LocationStrategy,private homeService: HomeService) {
    history.pushState(null, null, window.location.href);  
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });  
  }

  ionViewWillEnter() {
    this.getDashboardData();
    this.getData();
  }
  getDashboardData(){
    this.usersData = [];
    const path = 'api/user/getUser';
    let datas = {
      '_id':localStorage.getItem('_id')
    }
    this.homeService.postMethod(path, datas).pipe(take(1)).subscribe((res: any) => {
      this.check = false;
      this.usersData = res.data[0];
      this.getGoldRate();
    });
  }
  getData(){
    this.sendHistoryData = [];
    this.reciveHistoryData = [];
    const path = 'api/user/historyList';
    let datas = {
      '_id':localStorage.getItem('_id')
    }
    this.homeService.postMethod(path, datas).pipe(take(1)).subscribe((res: any) => {
      this.sendHistoryData = res.data.sendHistory.slice(0, 2);
      this.reciveHistoryData = res.data.recivedHistory.slice(0, 2);
    });
  }
  checkBalance(){
    this.usersData = [];
    const path = 'api/user/getUser';
    let datas = {
      '_id':localStorage.getItem('_id')
    }
    this.homeService.postMethod(path, datas).pipe(take(1)).subscribe((res: any) => {
      this.check = true;
      this.usersData = res.data[0];
    });
  }
  getGoldRate(){
    const path = 'api/XAU/SGD'
    this.homeService.getGoldMethod(path).pipe(take(1)).subscribe((res: any) => {
      this.goldData = res.price_gram_18k;
    });
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Example header',
      subHeader: 'Example subheader',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Share',
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
  }

  onClickSubmit(amt) {
      if(amt.value > 0){
        this.goldValue = amt.value / this.goldData;
        const path = "api/user/amount";
        let datas = {
          'amount': amt.value,
          '_id':localStorage.getItem('_id'),
          'goldRate': this.goldValue
        }
        this.homeService.postMethod(path, datas).pipe(take(1)).subscribe((res: any) => {
          this.toastr.success(res.message);
          // this.dismissed()
          this.getDashboardData();
        });
       } else {
         this.toastr.error('Please Enter amount');
       }
  }

  numericOnly(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
    this.toastr.success('User Sucessfully Logged Out');
  }
}
