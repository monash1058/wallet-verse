import{Injectable } from '@angular/core'

import{ActivatedRouteSnapshot,RouterStateSnapshot,CanDeactivate } from '@angular/router'
import { Observable} from 'rxjs'


export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({providedIn: 'root'})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
     let url: string = state.url;
     return component.canDeactivate ? component.canDeactivate() : true;
  }
}
