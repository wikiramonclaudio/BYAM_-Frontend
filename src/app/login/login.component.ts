import { PeerService } from './../services/peer/peer.service';
import { WebsocketService } from './../services/websocket.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import swal from 'sweetalert';
declare function initPlugins();

// google
declare const gapi: any;
declare const auth2: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public recuerdame: Boolean = false;
  public email: String;
  public token: String;
  public user: User;
  auth2: any;
  constructor(
    public router: Router,
    public userService: UserService,
    private wsService: WebsocketService,
    public peerService: PeerService
  ) { }

  ngOnInit() {
    initPlugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
    this.googleInit();
  }

  /* Init google sign in */
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '888275063073-3frfcc1jmgi9uijnkv79s9a1c6cukqt0.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('google-btn'));
    });
  }

  attachSignIn(element: any) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this.userService.googleLogin(token).subscribe(
        (response: any) => {
          window.location.href = '#/dashboard';
          // $('google-btn').popover('destroy');
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  login(form: NgForm) {
    const user = new User(
       null,
       form.value.email,
       form.value.password
    );
    this.userService.login(user, form.value.recuerdame).subscribe(
      (response: any) => {
        this.router.navigate(['/dashboard']);
        setTimeout(() => {
          // this.peerService.initPeer();
        }, 1000);
      },
      error => {
        swal('Usuario no encontrado, inténtalo otra vez!', user.email, 'error');
        console.log(error);
      }
    );
  }


}
