import { WebsocketService } from './../websocket.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import swal from 'sweetalert';
import { UploadFileService } from '../upload-file.service';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public token: string;
  public user: User;
  public menu: any = {};

  constructor(
    public _http: HttpClient,
    public router: Router,
    public uploadService: UploadFileService,
    public socket: Socket,
    public websocketService: WebsocketService
  ) {
    this.loadStorage();
   }

  createUser(user: User) {
    const params = JSON.stringify(user);
    const url = URL_SERVICES + '/user';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any) => {
      swal('Usuario registrado', ' ' + user.email, 'success');
      return res.user;
    });
  }

  updateUser(user: User) {
    const params = JSON.stringify(user);
    let url = URL_SERVICES + '/user/' + user._id;
    url += '?token=' + this.token;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, user, { headers: headers })
    .map((res: any) => {
        if (user._id == this.user._id) {
          let userDB: User = res.user;
          this.saveStorage(userDB._id, this.token, userDB, this.menu);
        }
      return res.user;
    });
  }

  googleLogin(googleToken: String) {
    const url = URL_SERVICES + '/login/google';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, {token: googleToken}, { headers: headers })
    .map((res: any) => {
      this.saveStorage(res.id, res.token, res.user, res.menu);
      this.websocketService.emit('addDoc', {user: res.user});
      return true;
    });
  }

  login(user: User, recordar: Boolean) {
    if (recordar) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    const params = JSON.stringify(user);
    const url = URL_SERVICES + '/login';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.user = user;
    return this._http.post(url, params, { headers: headers })
    .map((res: any) => {
      this.saveStorage(res.id, res.token, res.user, res.menu);
      this.user.connected = true;
      this.websocketService.emit('addDoc', {user: res.user});
      return true;
    });
  }

  isLogged() {
    return (this.token.length > 5 ) ? true : false;
  }

  loadStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  setToken(token: string, user: User) {
    this.token = token;
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
    this.user.connected = false;
    this.websocketService.emit('desconectar', {});
  }

  saveStorage(id: string, token: string, user: User, menu: any) {
    this.menu = menu;
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.user = user;
    this.token = token;
  }

  changeImg(file: File, id: string) {
    this.uploadService.uploadFile(file, 'users', id).then(
      (response: any) => {
        this.user.image = response.user.image;
        swal('Imagen de usuario actualizada correctamente', this.user.name, 'success');
        this.saveStorage(id, this.token, this.user, this.menu);
      }
    ).catch(
      error => {
      }
    );
  }

  getUsers(from: number): Observable<any> {
    const url = URL_SERVICES + '/user?from=' + from + '&token=' + this.token;
    return this._http.get(url);
  }

  getUser(userId: string): Observable<any> {
    const url = URL_SERVICES + '/user/' + userId + '?token=' + this.token;
    return this._http.get(url);
  }

  searchUser(term: string) {
    const url = URL_SERVICES + '/search/collection/user/' + term;
    return this._http.get(url).map(
      (response: any) => {
        return response.user;
      }
    );
  }

  deleteUser(id: string) {
    const url = URL_SERVICES + /user/ + id + '?token=' + this.token;
    return this._http.delete(url);
  }

  newToken() {
    const url = URL_SERVICES + '/login/newtoken?token=' + this.token;
    return this._http.get(url)
    .map((res: any) => {
      this.token = res.token;
      localStorage.setItem('token', this.token);
      console.log('token renovado');
      return true;
    },
    (err: any) => {
      this.router.navigate(['/login']);
      swal('No se pudo renovar el token, loggeate', err.error.message, 'success');
    });
  }

  getRanking() {
    const url = URL_SERVICES + '/user/ranking/winners?token=' + this.token;
    return this._http.get(url);
  }

  inviteFriend(invitation: any) {
    const params = JSON.stringify(invitation);
    const url = URL_SERVICES + '/user/invite';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers });
  }

  getJurorores() {
    const url = URL_SERVICES + '/jurorores';
    return this._http.get(url);
  }

  // get top 6 winners to dashboard
  getTopWinners () {
    const url = URL_SERVICES + '/user/ranking/topwinners?token=' + this.token;
    return this._http.get(url);
  }
}
