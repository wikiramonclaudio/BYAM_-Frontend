import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import swal from 'sweetalert';
import { UploadFileService } from '../upload-file.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(
    public _http: HttpClient,
    public router: Router,
    public uploadService: UploadFileService
  ) { }

  getMatches(): Observable<any> {
    const url = URL_SERVICES + '/match';
    return this._http.get(url);
  }

  getFinishedMatches(): Observable<any> {
    const url = URL_SERVICES + '/match/finished';
    return this._http.get(url);
  }

  getMatch(id: string): Observable<any> {
    const url = URL_SERVICES + '/match/' + id;
    return this._http.get(url);
  }

  deleteMatch(id: string, token: string) {
    // PONER EL TOKEN
    const url = URL_SERVICES + /match/ + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createMatch(match: any) {
    const params = JSON.stringify(match);
    const url = URL_SERVICES + '/match' + '?token=' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any) => {
      swal('Partido registrado', ' ' + 'El partido está ya disponible para añadirlo en las mesas de juego.', 'success');
      return res.match;
    });
  }


  createManyMatches(matches: any) {
    const params = JSON.stringify(matches);
    const url = URL_SERVICES + '/matchesbytable/several' + '?token=' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any) => {
      console.log('CREATE MANY MATCHES RESLT', res);
      // swal("Match registrado", " " + match.name, "success");
      return res;
    });
  }

  searchMatch(term: string) {
    const url = URL_SERVICES + '/search/collection/match/' + term;
    return this._http.get(url).map(
      (response: any) => {
        console.log(response);
        return response.match;
      }
    );
  }

  updateMatch(match: any) {
    const params = JSON.stringify(match);
    let url = URL_SERVICES + '/match/' + match._id;
    // revisar token
    url += '?token=' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, match, { headers: headers });
  }

  getMatchesByTable(tableId: string) {
    const url = URL_SERVICES + '/matchesbytable/' + tableId;
    return this._http.get(url);
  }

  getSpanishMatches() {
    const url = URL_SERVICES + '/matches';
    return this._http.get(url);
  }
}
