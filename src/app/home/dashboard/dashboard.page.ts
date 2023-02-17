import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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
  features: any[] = [
    {id: 1, name: 'Account', src: 'assets/icons/top-up.png', background: 'rgba(27,150,181, 0.1)', page: ''},
    {id: 2, name: 'Transfer to', src: 'assets/icons/cash-withdrawal.png', background: 'rgba(106,100,255, 0.1)', page: ''},
    {id: 3, name: 'Transactions', src: 'assets/icons/send.png', background: 'rgba(255, 196, 9, 0.1)', page: ''},
    {id: 4, name: 'Top-up', src: 'assets/icons/debit-card.png', background: 'rgba(27,150,181, 0.1)', page: ''},
  ];

  transactions: any[] = [
    {id: 1, vendor: 'Credited from Proinfocus', image: '', amount: 1500, time: '3:00PM'},
    {id: 2, vendor: 'Debited from Proinfocus', image: '', amount: -1200, time: '4:00PM'}
  ];

  constructor(private router : Router, private toastr: ToastrCustomService, private modalCtrl: ModalController,private homeService: HomeService) {}

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
      this.usersData = res.data;
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
      this.sendHistoryData = res.data.sendHistory.slice(0, 2)
      this.reciveHistoryData = res.data.recivedHistory.slice(0, 2)
    });
  }
  navigate(item:any){
    if(item.id == 1){
      this.router.navigate(['/admin/tab-nav/profile']); 
    } else if(item.id == 2){
      this.router.navigate(['/admin/tab-nav/transfer']); 
    }else if(item.id == 3){
      this.router.navigate(['/admin/tab-nav/transaction-history']); 
    } else {
      this.openModal(); 
    }

  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: TransferModalComponent,
      componentProps: {
        users: this.usersData,
        value: false
      },
    });
   modal.present();
   modal.onDidDismiss().then((data) => {
    this.getDashboardData()
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
      this.usersData = res.data;
    });
  }
}
