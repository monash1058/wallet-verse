import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroGuard } from './shared/guards/intro.guard'
import { AuthGuard } from './shared/auth-guard/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule), canLoad: [IntroGuard] },
  { path: 'admin', canActivate:[AuthGuard], loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }