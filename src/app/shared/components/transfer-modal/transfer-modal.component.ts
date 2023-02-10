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
  constructor( private homeService: HomeService, private toastr: ToastrCustomService, private modalCtrl: ModalController, private route: Router) { }

  ngOnInit() {
    this.data = this.users;
    this.isTransfer = this.value;
  }
  onClickSubmit(amt, msg) {
    if(this.isTransfer){
      if(amt.value > 0){
        const path = "api/user/transfer";
       let datas = {
         'amount': amt.value,
         'message': msg.value,
         'senderID':localStorage.getItem('_id'),
         "reciverID":this.data._id,
       }
       this.homeService.postMethod(path, datas).pipe(take(1)).subscribe((res: any) => {
         this.toastr.success(res.message);
         this.dismissed()
       });
       } else {
         this.toastr.error('Please Send valid amount');
       }
    } else {
      const path = "api/user/amount";
      let datas = {
        'amount': amt.value,
        '_id':localStorage.getItem('_id')
      }
      this.homeService.postMethod(path, datas).pipe(take(1)).subscribe((res: any) => {
        this.toastr.success(res.message);
        this.dismissed()
      });
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
