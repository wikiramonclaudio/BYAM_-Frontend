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
export class MessageService {

  constructor(
    public _http: HttpClient,
    public router: Router,
    public uploadService: UploadFileService
  ) { }

  getMessages(tableId: string): Observable<any>{    
    let url = URL_SERVICES + '/message/' + tableId;    
    return this._http.get(url);
  }

  getMessage(id: string): Observable<any>{
    let url = URL_SERVICES + '/message/' + id;    
    return this._http.get(url);
  }

  deleteMessage(id: string, token: string){
    //PONER EL TOKEN
    let url = URL_SERVICES + /message/ + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createMessage(message: any) { 
    let params = JSON.stringify(message);
    let url = URL_SERVICES + '/message'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      // swal("Message registrado", " " + message.name, "success");
      return res.message;
    });
  }


  createManyMessages(Messages: any) {
    let params = JSON.stringify(Messages);
    let url = URL_SERVICES + '/Messagesbytable/several'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      // swal("Message registrado", " " + message.name, "success");
      return res;
    });
  }

  searchMessage(term: string){
    let url = URL_SERVICES + '/search/collection/message/' + term;
    return this._http.get(url).map(
      (response: any)=>{        
        console.log(response);
        return response.message;
      }
    )
  }

  updateMessage(message: any){
    let params = JSON.stringify(message);
    let url = URL_SERVICES + '/message/' + message._id;  
    //revisar token
    url += '?token=' + localStorage.getItem('token'); 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, message, { headers: headers });    
  }

  getMessagesByTable(tableId: string){
    let url = URL_SERVICES + '/message/' + tableId;    
    return this._http.get(url);
  }

}
