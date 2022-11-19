import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  data: any[];
  filterKeys = ['vendor', 'amount'];
  constructor() { }

  ngOnInit() {
    this.data = [
      {id: 1, vendor: 'Credited from Proinfocus', image: '', amount: '1500', time: '3:00PM'},
      {id: 2, vendor: 'Debited from Proinfocus', image: '', amount: '-1200', time: '4:00PM'},
      {id: 3, vendor: 'Credited from Monash', image: '', amount: '3300', time: '8:00PM'},
      {id: 4, vendor: 'Debited from Google', image: '', amount: '-5400', time: '4:00PM'},
      {id: 5, vendor: 'Credited from Demo', image: '', amount: '8780', time: '2:20PM'},
      {id: 6, vendor: 'Debited from Test', image: '', amount: '302', time: '3:30PM'},
      {id: 7, vendor: 'Credited from Pixel Groups', image: '', amount: '7980', time: '8:40PM'},
      {id: 8, vendor: 'Debited from Private Groups', image: '', amount: '-1250', time: '7:00PM'},
      {id: 9, vendor: 'Credited from Public Test', image: '', amount: '3060', time: '6:20PM'},
      {id: 10, vendor: 'Debited from Beta Test', image: '', amount: '-6000', time: '9:20PM'}
    ]
  }

}
