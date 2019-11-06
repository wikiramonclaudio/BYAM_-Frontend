import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
public socketStatus = false;
public user: any = {};
  constructor(
    private socket: Socket,
    private router: Router,
    private userservice: UserService
  ) {
    this.loadStorage();
    this.checkStatus();
   }
   
  checkStatus(){
    console.log('checkStatus');
    this.socket.on('connect', ()=>{
      console.log('conectado al servidor socket');
      this.socketStatus = true;
      this.loadStorage();     
    });

    this.socket.on('disconnect', ()=>{
      console.log('desconectado del servidor socket');
      this.socketStatus = false;
    });
  }

  // Emite un evento al servidor
  emit(evento: string, payload?:any, callback?: Function){   
    this.socket.emit(evento, payload, callback);
  }

  // Escuchar eventos
  listen(evento: string){
    return this.socket.fromEvent( evento );
  }

  // login
  loginWs(nombre:string){
    return new Promise( (resolve, reject) => {
      this.emit('configurar-usuario', {nombre: nombre}, (res, err)=>{                 
          this.user = this.userservice.user;
          this.saveStorage();
          resolve();
      });
    });

  }

  saveStorage(){
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  loadStorage(){
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));        
      this.loginWs(this.user.name);
    }
  }

  getUser(){
    return this.user;
  }

  logoutWs(){
    this.user = null;
    localStorage.removeItem('user');
    const payload = {
      nombre: 'sin-nombre'
    };
    this.emit('configurar-usuario', payload);
    this.router.navigateByUrl('');
  }
}

