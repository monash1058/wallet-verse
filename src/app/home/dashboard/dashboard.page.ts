import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  features: any[] = [
    {id: 1, name: 'Account', src: 'assets/icons/top-up.png', background: 'rgba(27,150,181, 0.1)', page: ''},
    {id: 2, name: 'Transfer to', src: 'assets/icons/cash-withdrawal.png', background: 'rgba(106,100,255, 0.1)', page: ''},
    {id: 3, name: 'Transactions', src: 'assets/icons/send.png', background: 'rgba(255, 196, 9, 0.1)', page: ''},
    {id: 4, name: 'Wallet', src: 'assets/icons/debit-card.png', background: 'rgba(27,150,181, 0.1)', page: ''},
  ];

  transactions: any[] = [
    {id: 1, vendor: 'Credited from Proinfocus', image: '', amount: 1500, time: '3:00PM'},
    {id: 2, vendor: 'Debited from Proinfocus', image: '', amount: -1200, time: '4:00PM'}
  ];

  constructor(private router : Router) {}
  toggleMenu() {
    alert('Logout Successfully');
    this.router.navigate(['/auth/login']); 
  }
  navigate(item:any){
    if(item.id == 1){
      this.router.navigate(['/tab-nav/profile']); 
    } else if(item.id == 2){
      this.router.navigate(['/tab-nav/transfer']); 
    }else if(item.id == 3){
      this.router.navigate(['/tab-nav/transaction']); 
    } else {
      this.router.navigate(['/tab-nav/wallet']); 
    }

  }
}
