import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public user: any = {};
  constructor(
    public socket: Socket,
    private router: Router    
  ) {
    // this.loadStorage();
    // this.checkStatus();
    // this.socket.on('user-conected', (user: any) => {
    //   console.log('ISIARIO CONECTADO', user);
    //   console.log(typeof user);
    // });
  }

  emit(eventName: string, params: Object ){
    this.socket.emit(eventName, params);
  }

  listen(eventName: string, params: Object ){
    return this.socket.fromEvent(eventName);
  }

  // checkStatus() {
  //   this.socket.on('connect', () => {
  //     this.socketStatus = true;
  //     this.loadStorage();
  //   });

  //   this.socket.on('disconnect', () => {
  //     console.log('desconectado del servidor socket');
  //     // this.emit('user-disconnect', {user: this.userservice.user});
  //     this.socketStatus = false;
  //   });
  // }

  // // Emite un evento al servidor
  // emit(evento: string, payload?: any, callback?: Function) {
  //   this.socket.emit(evento, payload, callback);
  // }

  // // Escuchar eventos
  // listen(evento: string) {
  //   return this.socket.fromEvent(evento);
  // }

  // // login
  // loginWs(user: any) {
  //   return new Promise((resolve, reject) => {
  //     this.emit('configurar-usuario', { user }, (res, err) => {
  //       this.user = this.userservice.user;
  //       this.saveStorage();
  //       resolve();
  //     });
  //   });

  // }

  // saveStorage() {
  //   localStorage.setItem('user', JSON.stringify(this.user));
  // }

  // loadStorage() {
  //   if (localStorage.getItem('user')) {
  //     this.user = JSON.parse(localStorage.getItem('user'));
  //     this.loginWs(this.user);
  //   }
  // }

  // getUser() {
  //   return this.user;
  // }

  // logoutWs() {
  //   this.user = null;
  //   localStorage.removeItem('user');
  //   const payload = {
  //     nombre: 'sin-nombre'
  //   };
  //   // this.emit('configurar-usuario', payload);
  //   this.router.navigateByUrl('');
  // }

  // socket.io-client test

}

