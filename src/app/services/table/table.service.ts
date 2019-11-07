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
export class TableService {

  constructor(
    public _http: HttpClient,
    public router: Router,
    public uploadService: UploadFileService
  ) { }

  getTables(): Observable<any>{
    let url = URL_SERVICES + '/table';    
    return this._http.get(url);
  }

  getTable(id: string): Observable<any>{
    let url = URL_SERVICES + '/table/' + id;    
    return this._http.get(url);
  }

  deleteTable(id: string, token: string){
    //PONER EL TOKEN
    let url = URL_SERVICES + /table/ + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createTable(table: any) {
    let params = JSON.stringify(table);
    let url = URL_SERVICES + '/table'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      swal("Table registrado", " " + table.name, "success");
      return res.table;
    });
  }

  searchTable(term: string){
    let url = URL_SERVICES + '/search/collection/table/' + term;
    return this._http.get(url).map(
      (response: any)=>{        
        console.log(response);
        return response.table;
      }
    )
  }

  updateTable(table: any){
    let params = JSON.stringify(table);
    let url = URL_SERVICES + '/table/' + table._id;  
    //revisar token
    url += '?token=' + localStorage.getItem('token'); 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, table, { headers: headers });    
  }
}
