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

  getTables(filters: any, from: any): Observable<any> {
    const params = JSON.stringify(filters);
    const url = URL_SERVICES + '/table?from=' + from;
    return this._http.get(url);
  }

  getArchivedTables(filters: any): Observable<any> {
    const params = JSON.stringify(filters);
    const url = URL_SERVICES + '/table/archived';
    return this._http.get(url);
  }

  getTable(id: string): Observable<any> {
    const url = URL_SERVICES + '/table/' + id;
    return this._http.get(url);
  }

  deleteTable(id: string, token: string) {
    // PONER EL TOKEN
    const url = URL_SERVICES + /table/ + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createTable(table: any) {
    const params = JSON.stringify(table);
    const url = URL_SERVICES + '/table' + '?token=' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
      .map((res: any) => {
        return res.table;
      });
  }

  searchTable(term: string) {
    const url = URL_SERVICES + '/search/collection/table/' + term;
    return this._http.get(url).map(
      (response: any) => {
        return response.table;
      }
    );
  }

  updateTable(table: any) {
    const params = JSON.stringify(table);
    let url = URL_SERVICES + '/table/' + table._id;
    // revisar token
    url += '?token=' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, table, { headers: headers });
  }

  setTableWinner(table: any) {
    console.log('TABLE ENVIADA', table);
    const params = JSON.stringify(table);
    let url = URL_SERVICES + '/table/set-winner/' + table._id;
    // revisar token
    url += '?token=' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, table, { headers: headers });
  }

  // getLast 3 tables to dashboard view
  getLastTables() {
    const url = URL_SERVICES + '/table/lasttables';
    return this._http.get(url);
  }


}
