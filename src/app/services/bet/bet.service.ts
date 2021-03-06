import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import swal from 'sweetalert';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  constructor(
    public _http: HttpClient,
    public router: Router,
  ) { }

  getBets(): Observable<any> {
    const url = URL_SERVICES + '/bet';
    return this._http.get(url);
  }

  getBet(id: string): Observable<any> {
    const url = URL_SERVICES + '/bet/' + id;
    return this._http.get(url);
  }

  deleteBet(id: string, token: string) {
    const url = URL_SERVICES + '/bet/' + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createBet(bet: any) {
    const params = JSON.stringify(bet);
    const url = URL_SERVICES + '/bet' + '?token=' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any) => {
      swal('Bet registrado', ' ' + bet.name, 'success');
      return res.bet;
    });
  }

  createManyBets(bets: any) {
    const params = JSON.stringify(bets);
    const url = URL_SERVICES + '/bet/several' + '?token=' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any) => {
      // swal("Bet registrado", " " + bet.name, "success");
      return res;
    });
  }

  searchBet(term: string) {
    const url = URL_SERVICES + '/search/collection/bet/' + term;
    return this._http.get(url).map(
      (response: any) => {
        console.log(response);
        return response.bet;
      }
    );
  }

  updateBet(bet: any) {
    const params = JSON.stringify(bet);
    let url = URL_SERVICES + '/bet/' + bet._id;
    // revisar token
    url += '?token=' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, bet, { headers: headers });
  }

  getBetsByTable(tableId: string): Observable<any> {
    const url = URL_SERVICES + '/bet/tablebets/' + tableId;
    return this._http.get(url);
  }

}
