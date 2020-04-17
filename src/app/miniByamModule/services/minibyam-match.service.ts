import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class MinibyamMatchService {

  constructor(
    private _http: HttpClient
  ) { }

  getGameByUser(userId) {
    let url = URL_SERVICES + '/minibyam/game/' + userId;
    return this._http.get(url);
  }

  createCalendar(matches: any) {
    let params = JSON.stringify(matches);
    let url = URL_SERVICES + '/minibyam/match/several' + '?token=' + localStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
  }

  getNextMatch(week: number, team: string) {
    let url = URL_SERVICES + '/minibyam/match/next/' + week + '/' + team;
    return this._http.get(url);
  }

  updateMatch(match: any) {
    let params = JSON.stringify(match);
    let url = URL_SERVICES + '/minibyam/match/' + match._id;
    //revisar token
    url += '?token=' + localStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, match, { headers: headers });
  }

}
