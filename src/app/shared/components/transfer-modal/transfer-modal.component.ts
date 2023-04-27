import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { HomeService } from 'src/app/home/home.service';
import { ToastrCustomService } from '../../service/toastr.service';

@Component({
  selector: 'app-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrls: ['./transfer-modal.component.scss'],
})
export class TransferModalComponent implements OnInit {
users:any;
value:any;
data:any;
isTransfer:any;
usersData: any;
goldValue: any;
goldData:any;
  constructor( private homeService: HomeService, private toastr: ToastrCustomService, private modalCtrl: ModalController, private route: Router) { }

  ngOnInit() {
    this.data = this.users;
    this.isTransfer = this.value;
  }

  ionViewWillEnter() {
    this.getDashboardData();
    this.getGoldRate();
  }

  getDashboardData(){
    this.usersData = [];
    const path = 'api/user/getUser';
    let datas = {
      '_id':localStorage.getItem('_id')
    }
    this.homeService.postMethod(path, datas).pipe(take(1)).subscribe((res: any) => {
      this.usersData = res.data[0];
    });
  }
  getGoldRate(){
    const path = 'api/XAU/SGD'
    this.homeService.getGoldMethod(path).pipe(take(1)).subscribe((res: any) => {
      this.goldData = res.price_gram_18k;
    });
  }
  onClickSubmit(amt) {
      if(amt.value > 0){
        this.goldValue = amt.value / this.goldData;
        const path = "api/user/transfer";
       let datas = {
         'amount': amt.value,
         'senderID':localStorage.getItem('_id'),
         "reciverID":this.data._id,
         "goldRate" : this.goldValue
       }
       this.homeService.postMethod(path, datas).pipe(take(1)).subscribe((res: any) => {
         this.toastr.success(res.message);
         this.dismissed()
       });
       } else {
         this.toastr.error('Please Send valid amount');
       }
  }
  numericOnly(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
  dismissed(){
    this.modalCtrl.dismiss();
    this.route.navigate(['../../../admin/tab-nav/dashboard']);
  }
}
