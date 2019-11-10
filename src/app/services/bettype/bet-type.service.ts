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
export class BetTypeService {

  constructor(
    public _http: HttpClient,
    public router: Router,
    public uploadService: UploadFileService
  ) { }

  getBetTypes(): Observable<any>{
    let url = URL_SERVICES + '/bet-type';    
    return this._http.get(url);
  }

  getBetType(id: string): Observable<any>{
    let url = URL_SERVICES + '/bet-type/' + id;    
    return this._http.get(url);
  }

  deleteBetType(id: string, token: string){
    //PONER EL TOKEN
    let url = URL_SERVICES + '/bet-type/' + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createBetType(betType: any) {
    let params = JSON.stringify(betType);
    let url = URL_SERVICES + '/bet-type'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      swal("BetType registrado", " " + betType.name, "success");
      return res.betType;
    });
  }

  searchBetType(term: string){
    let url = URL_SERVICES + '/search/collection/betType/' + term;
    return this._http.get(url).map(
      (response: any)=>{        
        console.log(response);
        return response.betType;
      }
    )
  }

  updateBetType(betType: any){
    let params = JSON.stringify(betType);
    let url = URL_SERVICES + '/bet-type/' + betType._id;  
    //revisar token
    url += '?token=' + localStorage.getItem('token'); 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, betType, { headers: headers });    
  }


  // BET TYPES OPTIONS..(TO PUT IN ANOTHER FILE??) SERVICE
  createBetTypeOption(betTypeOption: any) {
    let params = JSON.stringify(betTypeOption);
    let url = URL_SERVICES + '/bet-type-option'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      swal("BetType registrado", " " + betTypeOption.name, "success");
      return res;
    });
  }

  getBetOptions(): Observable<any>{
    let url = URL_SERVICES + '/bet-type-option';    
    return this._http.get(url);
  }
}
