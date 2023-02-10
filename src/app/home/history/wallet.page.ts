import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  checked:any = 'tab1';
  usersData: any;
  sendHistoryData: any[] = [];
  reciveHistoryData: any[] = [];
  constructor( private homeService: HomeService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getData();
    this.getDashboardData();
  }

  getDashboardData(){
    this.usersData = [];
    const path = 'api/user/getUser';
    let datas = {
      '_id':localStorage.getItem('_id')
    }
    this.homeService.postMethod(path, datas).pipe(take(1)).subscribe((res: any) => {
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
      this.sendHistoryData = res.data.sendHistory;
      this.reciveHistoryData = res.data.recivedHistory;
    });
  }
  // filterTransactions() {
  //   if(this.checked == 'tab1') {
  //     this.transactions = this.allTransactions.filter(x => x.amount >= 0);
  //   } else {
  //     this.transactions = this.allTransactions.filter(x => x.amount < 0);
  //   }
  // }
  segmentChanged(event) {
    this.checked = event;
    console.log(this.checked);
    // this.filterTransactions();
  }
}
