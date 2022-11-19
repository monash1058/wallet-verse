import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkBanksPage } from './link-banks.page';

const routes: Routes = [
  {
    path: '',
    component: LinkBanksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkBanksPageRoutingModule {}
