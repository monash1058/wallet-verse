import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { TransferModalComponent } from 'src/app/shared/components/transfer-modal/transfer-modal.component';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage {
  query: string;
  shops: any[] = [];
  allShops: any[] = [];
  getsData: Array<any> = [];
  usersData: any;
  filterKeys = ['name', 'phone'];
  search:any;
  constructor(private modalCtrl: ModalController, private homeService: HomeService) {}

  ionViewWillEnter() {
    this.getData()
  }
  getData(){
    this.getsData = [];
    const path = 'api/user/getAllLists';
    let datas = {
      '_id':localStorage.getItem('_id')
    }
    this.homeService.postMethod(path, datas).pipe(take(1)).subscribe((res: any) => {
      this.getsData = res.data;
    });
  }
  // async onSearchChange(event) {
  //   // this.query = event.detail.value.toLowerCase();
  //   this.shops = [];
  //   if(this.query.length > 0) {
  //    this.shops = this.usersData.filter((d)=>{
  //       return Object.keys(d).some(key => {
  //         return String(d[key].auth.phone).toLowerCase().includes(event.detail.value.toLowerCase())})});
  //       // console.log(d.auth.phone);
  //       // return d.auth.phone.includes(this.query) !== -1 || !this.query;
  //     // })
  //   }
  // }

  async selectUser(user) {
    const modal = await this.modalCtrl.create({
      component: TransferModalComponent,
      componentProps: {
        users: user,
        value: true
      },
    });
   modal.present();
   modal.onDidDismiss().then((data) => {
  });
  }

}
