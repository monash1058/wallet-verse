import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link-banks',
  templateUrl: './link-banks.page.html',
  styleUrls: ['./link-banks.page.scss'],
})
export class LinkBanksPage implements OnInit {
  sc: string = '';
  cNumber: string = '';
  name: string = '';
  iban: string = '';
  // expiration: string | number = '';
  constructor(private router : Router) { }

  ngOnInit() {
  }
  toggleMenu() {
    alert('Logout Successfully');
    this.router.navigate(['/auth/login']); 
  }
}
