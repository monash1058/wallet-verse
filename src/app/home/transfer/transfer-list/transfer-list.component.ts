import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss'],
})
export class TransferListComponent implements OnInit {
  slideOptsTop = {
    initialSlide: 1,
  };
  constructor() { }

  ngOnInit() {}

}
