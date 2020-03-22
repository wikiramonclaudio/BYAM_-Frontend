import { WebsocketService } from 'src/app/services/websocket.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ChecktokenGuard implements CanActivate {
  token;
  constructor(
    public userService: UserService,
    public router: Router,
    public webSocketService: WebsocketService
  ){
    userService.token;
  }

  canActivate(): Promise<boolean> | boolean {    
    let token = this.userService.token;
    let payload = JSON.parse( atob( token.split('.')[1]));
    let expirated = this.expirated(payload.exp);
    if(expirated){
      this.router.navigate(['/login']);
      return false;
    }
    
    return this.verifyNewToken(payload.exp);
  }

  verifyNewToken(expDate: number):Promise<boolean>{
    return new Promise( (resolve, reject)=>{
      // to milliseconds
      let tokenExp = new Date(expDate * 1000);
      let now = new Date();
      //Si falta una hora para expirar se renueva el token
      now.setTime( now.getTime() + (1*60*60*1000));
      if(tokenExp.getTime()>now.getTime()){
        this.webSocketService.emit('addDoc', {user: this.userService.user}); 
        resolve(true);
      }else{
        //token proximo a vencer, renovar token
        this.userService.newToken().subscribe(ok=>{
          this.webSocketService.emit('addDoc', {user: this.userService.user}); 
          resolve();
        },
        (err)=>{
          this.router.navigate(['/login']);
          reject(false);
        });
      }
    });
  }

  //check if the token is expirated
  expirated(expDate: number){
    //in seconds
    let now = new Date().getTime() / 1000;
    if(expDate < now){
      return true;
    }else{
      return false;
    }
  }
}
