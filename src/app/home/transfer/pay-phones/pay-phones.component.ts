import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-phones',
  templateUrl: './pay-phones.component.html',
  styleUrls: ['./pay-phones.component.scss'],
})
export class PayPhonesComponent implements OnInit {
  data: any[];
  search: string;
  filterKeys = ['name', 'phoneNumber'];

  constructor() { }

  ngOnInit() {
    this.data = [
      {id: 1, name: 'Jessica', phoneNumber: 8876543210},
      {id: 2, name: 'Christoper', phoneNumber: 7893463289},
      {id: 3, name: 'Josh', phoneNumber: 8765384965},
      {id: 4, name: 'Hanwar', phoneNumber: 9835573654},
      {id: 5, name: 'Rithwik', phoneNumber: 9829843210},
      {id: 6, name: 'Mohideen', phoneNumber: 8765009342},
      {id: 7, name: 'Vinayak', phoneNumber: 9874455879},
      {id: 8, name: 'Jenifer', phoneNumber: 7658965412},
      {id: 9, name: 'Gibhran', phoneNumber: 8734654987},
      {id: 10, name: 'Anas Khan', phoneNumber: 7123478965}
    ]
  }
}
