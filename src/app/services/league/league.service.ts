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
export class LeagueService {

  constructor(
    public _http: HttpClient,
    public router: Router,
    public uploadService: UploadFileService
  ) { }

  getLeagues(): Observable<any>{    
    let url = URL_SERVICES + '/league';    
    return this._http.get(url);
  }

  getLeague(id: string): Observable<any>{
    let url = URL_SERVICES + '/league/' + id;    
    return this._http.get(url);
  }

  deleteLeague(id: string, token: string){
    //PONER EL TOKEN
    let url = URL_SERVICES + /league/ + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createLeague(league: any) { 
    let params = JSON.stringify(league);
    let url = URL_SERVICES + '/league'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      // swal("League registrado", " " + league.name, "success");
      return res.league;
    });
  }


  createManyLeagues(Leagues: any) {
    let params = JSON.stringify(Leagues);
    let url = URL_SERVICES + '/Leaguesbytable/several'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      // swal("League registrado", " " + league.name, "success");
      return res;
    });
  }

  searchLeague(term: string){
    let url = URL_SERVICES + '/search/collection/league/' + term;
    return this._http.get(url).map(
      (response: any)=>{        
        console.log(response);
        return response.league;
      }
    )
  }

  updateLeague(league: any){
    let params = JSON.stringify(league);
    let url = URL_SERVICES + '/league/' + league._id;  
    //revisar token
    url += '?token=' + localStorage.getItem('token'); 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, league, { headers: headers });    
  }

  getLeaguesByTable(tableId: string){
    let url = URL_SERVICES + '/league/' + tableId;    
    return this._http.get(url);
  }

}
