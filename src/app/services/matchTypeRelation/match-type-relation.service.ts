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
export class MatchTypeRelationService {

  constructor(
    public _http: HttpClient,
    public router: Router,
    public uploadService: UploadFileService
  ) { }

  getMatchTypeRelations(toCheck: any): Observable<any> {
    // let url = URL_SERVICES + '/match-type-relation/' + toCheck;
    const url = URL_SERVICES + '/match-type-relation/';
    return this._http.get(url);
  }

  getMatchTypeRelation(id: string): Observable<any> {
    const url = URL_SERVICES + '/match-type-relation/' + id;
    return this._http.get(url);
  }

  deleteMatchTypeRelation(id: string, token: string) {
    // PONER EL TOKEN
    const url = URL_SERVICES + '/match-type-relation/' + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createMatchTypeRelation(matchTypeRelation: any) {
    const params = JSON.stringify(matchTypeRelation);
    const url = URL_SERVICES + '/match-type-relation' + '?token=' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any) => {
      swal('MatchTypeRelation registrado', ' ' + matchTypeRelation.name, 'success');
      return res.matchTypeRelation;
    });
  }


  createManyMatchTypeRelations(matchTypeRelationes: any) {
    console.log(matchTypeRelationes);
    const params = JSON.stringify(matchTypeRelationes);
    const url = URL_SERVICES + '/match-type-relation/several' + '?token=' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any) => {
      // swal("MatchTypeRelation registrado", " " + matchTypeRelation.name, "success");
      return res;
    });
  }

  searchMatchTypeRelation(term: string) {
    const url = URL_SERVICES + '/search/collection/match-type-relation/' + term;
    return this._http.get(url).map(
      (response: any) => {
        console.log(response);
        return response.matchTypeRelation;
      }
    );
  }

  updateMatchTypeRelation(matchTypeRelation: any) {
    const params = JSON.stringify(matchTypeRelation);
    let url = URL_SERVICES + '/match-type-relation/' + matchTypeRelation._id;
    // revisar token
    url += '?token=' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, matchTypeRelation, { headers: headers });
  }

  getMatchTypeRelationsByTable(tableId: string) {
    const url = URL_SERVICES + '/match-type-relation/' + tableId;
    return this._http.get(url);
  }

}
