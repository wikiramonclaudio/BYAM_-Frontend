import { UserService } from './../user/user.service';
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
    public uploadService: UploadFileService,
    public userService: UserService
  ) { }

  getSubscriptionTables(): Observable<any> {
    const url = URL_SERVICES + '/table-subscription';
    return this._http.get(url);
  }

  getSubscriptionsByTable(id: string): Observable<any> {
    const url = URL_SERVICES + '/table-subscription/' + id;
    return this._http.get(url);
  }

  getSubscriptionsByUser(id: string): Observable<any> {
    const url = URL_SERVICES + '/table-subscription/user/' + id;
    return this._http.get(url);
  }

  deleteSubscriptionTable(id: string, token: string) {
    // PONER EL TOKEN
    const url = URL_SERVICES + '/table-subscription/' + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createSubscriptionTable(tablesubscription: any, amount?: number) {
    const params = JSON.stringify(tablesubscription);
    const url = URL_SERVICES + '/table-subscription' + '?token=' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
      .map((res: any) => {
        this.userService.user.money = this.userService.user.money - amount;
        this.userService.updateUser(this.userService.user).subscribe(
          res => {
            console.log('OK USUARIO CON - ', amount + ' en su cuenta');
          }
        );
        return res.tablesubscription;
      });

  }

  searchSubscriptionTable(term: string) {
    const url = URL_SERVICES + '/search/collection/tablesubscription/' + term;
    return this._http.get(url).map(
      (response: any) => {
        return response.tablesubscription;
      }
    );
  }

  updateSubscriptionTable(tablesubscription: any) {
    const params = JSON.stringify(tablesubscription);
    let url = URL_SERVICES + '/table-subscription/' + tablesubscription._id;
    // revisar token
    url += '?token=' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, tablesubscription, { headers: headers });
  }
}
