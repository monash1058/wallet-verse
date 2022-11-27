import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-bank',
  templateUrl: './pay-bank.component.html',
  styleUrls: ['./pay-bank.component.scss'],
})
export class PayBankComponent implements OnInit {
  amount:string = '0';
  constructor() { }

  ngOnInit() {}

}
