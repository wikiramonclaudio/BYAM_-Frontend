
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
export class NotificationService {

  constructor(
    public _http: HttpClient,
    public router: Router,
    public uploadService: UploadFileService
  ) { }

  getNotifications(receiver: string): Observable<any>{
    console.log('RECEIVER EN SERVICE', receiver);
    let url = URL_SERVICES + '/notification/' + receiver;    
    return this._http.get(url);
  }

  getNotification(id: string): Observable<any>{
    let url = URL_SERVICES + '/notification/' + id;    
    return this._http.get(url);
  }

  deleteNotification(id: string, token: string){
    //PONER EL TOKEN
    let url = URL_SERVICES + /notification/ + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createNotification(notification: any) { 
    let params = JSON.stringify(notification);
    let url = URL_SERVICES + '/notification'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      swal("Notification registrado", " " + notification.name, "success");
      return res.notification;
    });
  }


  createManyNotifications(Notifications: any) {
    let params = JSON.stringify(Notifications);
    let url = URL_SERVICES + '/Notificationsbytable/several'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      // swal("Notification registrado", " " + notification.name, "success");
      return res;
    });
  }

  searchNotification(term: string){
    let url = URL_SERVICES + '/search/collection/notification/' + term;
    return this._http.get(url).map(
      (response: any)=>{        
        console.log(response);
        return response.notification;
      }
    )
  }

  updateNotification(notification: any){
    let params = JSON.stringify(notification);
    let url = URL_SERVICES + '/notification/' + notification._id;  
    //revisar token
    url += '?token=' + localStorage.getItem('token'); 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, notification, { headers: headers });    
  }

  getNotificationsByTable(tableId: string){
    let url = URL_SERVICES + '/Notificationsbytable/' + tableId;    
    return this._http.get(url);
  }

}
