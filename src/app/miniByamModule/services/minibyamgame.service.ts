import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class MinibyamgameService {

  constructor(
    private _http: HttpClient
  ) { }

  getGameByUser(userId){
    let url = URL_SERVICES + '/minibyam/game/' + userId;
    return this._http.get(url);
  }

  createGame(game: any){
    let params = JSON.stringify(game);
    let url = URL_SERVICES + '/minibyam/game' + '?token=' + localStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers });
    // .map((res: any)=>{
    //   return res.bet;
    // });
  }

  updateGame(game: any) {
    let params = JSON.stringify(game);
    let url = URL_SERVICES + '/minibyam/game/' + game._id;
    //revisar token
    url += '?token=' + localStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, game, { headers: headers });
  }

}
