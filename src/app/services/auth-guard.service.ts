import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from './Authentication.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public authenticationService: AuthenticationService, private router: Router) {}

        canActivate(
          next: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): boolean | UrlTree {
             let url: string = state.url;
       
                 return this.checkLogin(url);
             }
       
             checkLogin(url: string): true | UrlTree {
                console.log("Url: " + url)
                let val: string = localStorage.getItem('isUserLoggedIn');
       
                if(val != null && val == "true"){
                   if(url == "/auth/login")
                      this.router.parseUrl('../../tab-nav/dashboard');
                   else 
                      return true;
                } else {
                   return this.router.parseUrl('/auth/login');
                }
             }

}