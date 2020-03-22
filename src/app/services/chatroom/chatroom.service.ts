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
export class ChatroomService {

  constructor(
    public _http: HttpClient,
    public router: Router,
    public uploadService: UploadFileService
  ) { }

  getChatRooms(user1: string, user2: string): Observable<any>{    
    let url = URL_SERVICES + '/chatroom/' + user1 + '/' + user2;    
    return this._http.get(url);
  }

  getChatRoom(id: string): Observable<any>{
    let url = URL_SERVICES + '/chatroom/' + id;    
    return this._http.get(url);
  }

  deleteChatRoom(id: string, token: string){
    //PONER EL TOKEN
    let url = URL_SERVICES + /chatroom/ + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createChatRoom(chatroom: any) { 
    let params = JSON.stringify(chatroom);
    let url = URL_SERVICES + '/chatroom'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      // swal("ChatRoom registrado", " " + chatroom.name, "success");
      return res.chatroom;
    });
  }


  createManyChatRooms(ChatRooms: any) {
    let params = JSON.stringify(ChatRooms);
    let url = URL_SERVICES + '/ChatRoomsbytable/several'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      // swal("ChatRoom registrado", " " + chatroom.name, "success");
      return res;
    });
  }

  searchChatRoom(term: string){
    let url = URL_SERVICES + '/search/collection/chatroom/' + term;
    return this._http.get(url).map(
      (response: any)=>{        
        console.log(response);
        return response.chatroom;
      }
    )
  }

  updateChatRoom(chatroom: any){
    let params = JSON.stringify(chatroom);
    let url = URL_SERVICES + '/chatroom/' + chatroom._id;  
    //revisar token
    url += '?token=' + localStorage.getItem('token'); 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, chatroom, { headers: headers });    
  }

  getChatRoomsByTable(tableId: string){
    let url = URL_SERVICES + '/chatroom/' + tableId;    
    return this._http.get(url);
  }

}
