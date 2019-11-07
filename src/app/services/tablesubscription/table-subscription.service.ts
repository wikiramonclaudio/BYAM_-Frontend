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
export class SubscriptionTableService {

  constructor(
    public _http: HttpClient,
    public router: Router,
    public uploadService: UploadFileService
  ) { }

  getSubscriptionTables(): Observable<any>{
    let url = URL_SERVICES + '/table-subscription';    
    return this._http.get(url);
  }

  getSubscriptionsByTable(id: string): Observable<any>{
    let url = URL_SERVICES + '/table-subscription/' + id;    
    return this._http.get(url);
  }

  deleteSubscriptionTable(id: string, token: string){
    //PONER EL TOKEN
    let url = URL_SERVICES + '/table-subscription/' + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createSubscriptionTable(tablesubscription: any) {
    let params = JSON.stringify(tablesubscription);
    let url = URL_SERVICES + '/table-subscription'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      swal("SubscriptionTable registrado", " " + tablesubscription.name, "success");
      return res.tablesubscription;
    });
  }

  searchSubscriptionTable(term: string){
    let url = URL_SERVICES + '/search/collection/tablesubscription/' + term;
    return this._http.get(url).map(
      (response: any)=>{        
        console.log(response);
        return response.tablesubscription;
      }
    )
  }

  updateSubscriptionTable(tablesubscription: any){
    let params = JSON.stringify(tablesubscription);
    let url = URL_SERVICES + '/table-subscription/' + tablesubscription._id;  
    //revisar token
    url += '?token=' + localStorage.getItem('token'); 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, tablesubscription, { headers: headers });    
  }
}
