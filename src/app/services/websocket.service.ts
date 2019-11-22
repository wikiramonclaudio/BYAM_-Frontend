import { Observable } from 'rxjs/Observable';
import { URL_SERVICES } from 'src/app/config/config';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public user: any = {};
  private socket; //SOcket to connect with socket server
  constructor(
    // public socket: Socket,
    private router: Router,
    private userservice: UserService
  ) {
    // this.loadStorage();
    // this.checkStatus();
    // this.socket.on('user-conected', (user: any) => {
    //   console.log('ISIARIO CONECTADO', user);
    //   console.log(typeof user);
    // });
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
  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(URL_SERVICES);

    let observable = new Observable(observer => {
      // this.socket.on('message', (data) => {
      //   console.log('received message from websocket server');
      //   observer.next(data);
      // });

      this.socket.on('user-connected', (data) => {
        console.log('User connected', data);
        observer.next(data);
      });
      
      // return () => {
      //   this.socket.disconnect();
      // }
    });

    let observer = {
      next: (data: Object)=>{
        // this.socket.emit('message', JSON.stringify(data));
        console.log('USUARIO CONECTADO', data);
      }
    };

    return Rx.Subject.create(observer, observable);
  }

  connectUser(user:any){
    this.socket = io(URL_SERVICES, {transports: ['websocket']});
    this.socket.emit('configure-user', JSON.stringify(user));    
  }
}

