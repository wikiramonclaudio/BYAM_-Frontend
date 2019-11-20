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

  getMatches(): Observable<any>{
    let url = URL_SERVICES + '/match';    
    return this._http.get(url);
  }

  getFinishedMatches(): Observable<any>{
    let url = URL_SERVICES + '/match/finished';    
    return this._http.get(url);
  }

  getMatch(id: string): Observable<any>{
    let url = URL_SERVICES + '/match/' + id;    
    return this._http.get(url);
  }

  deleteMatch(id: string, token: string){
    //PONER EL TOKEN
    let url = URL_SERVICES + /match/ + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createMatch(match: any) {
    let params = JSON.stringify(match);
    let url = URL_SERVICES + '/match'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      swal("Match registrado", " " + match.name, "success");
      return res.match;
    });
  }


  createManyMatches(matches: any) {
    let params = JSON.stringify(matches);
    let url = URL_SERVICES + '/matchesbytable/several'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      // swal("Match registrado", " " + match.name, "success");
      return res;
    });
  }

  searchMatch(term: string){
    let url = URL_SERVICES + '/search/collection/match/' + term;
    return this._http.get(url).map(
      (response: any)=>{        
        console.log(response);
        return response.match;
      }
    )
  }

  updateMatch(match: any){
    let params = JSON.stringify(match);
    let url = URL_SERVICES + '/match/' + match._id;  
    //revisar token
    url += '?token=' + localStorage.getItem('token'); 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, match, { headers: headers });    
  }

  getMatchesByTable(tableId: string){
    let url = URL_SERVICES + '/matchesbytable/' + tableId;    
    return this._http.get(url);
  }

  getSpanishMatches(){
    let url = URL_SERVICES + '/matches';    
    return this._http.get(url);
  }
}
