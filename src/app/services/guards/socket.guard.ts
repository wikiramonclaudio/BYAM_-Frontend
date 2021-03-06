import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate,
           route: ActivatedRouteSnapshot,
           state: RouterStateSnapshot) {

     let url: string = state.url;
     console.log('Url: '+ url);

     alert('CAN DEACTIVATE');

     return component.canDeactivate ? component.canDeactivate() : true;
  }
}
