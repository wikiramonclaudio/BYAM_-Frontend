import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public userService: UserService,
    public router: Router
  ) {

  }
  canActivate() {
    if (this.userService.user.role == 'ROLE_ADMIN') {
      return true;
    } else {
      this.userService.logout();
      return false;
    }
  }
}
