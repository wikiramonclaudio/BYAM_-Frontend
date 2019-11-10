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
export class OptionTypeRelationService {

  constructor(
    public _http: HttpClient,
    public router: Router,
    public uploadService: UploadFileService
  ) { }

  getOptionTypeRelations(): Observable<any>{
    let url = URL_SERVICES + '/option-type-relation';    
    return this._http.get(url);
  }

  getOptionTypeRelation(id: string): Observable<any>{
    let url = URL_SERVICES + '/option-type-relation/' + id;    
    return this._http.get(url);
  }

  deleteOptionTypeRelation(id: string, token: string){
    //PONER EL TOKEN
    let url = URL_SERVICES + '/option-type-relation/' + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createOptionTypeRelation(optionTypeRelation: any) {
    let params = JSON.stringify(optionTypeRelation);
    let url = URL_SERVICES + '/option-type-relation'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      swal("OptionTypeRelation registrado", " " + optionTypeRelation.name, "success");
      return res.optionTypeRelation;
    });
  }


  createManyOptionTypeRelations(optionTypeRelationes: any) {
    let params = JSON.stringify(optionTypeRelationes);
    let url = URL_SERVICES + '/option-type-relation/several'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      // swal("OptionTypeRelation registrado", " " + optionTypeRelation.name, "success");
      return res;
    });
  }

  searchOptionTypeRelation(term: string){
    let url = URL_SERVICES + '/search/collection/option-type-relation/' + term;
    return this._http.get(url).map(
      (response: any)=>{        
        console.log(response);
        return response.optionTypeRelation;
      }
    )
  }

  updateOptionTypeRelation(optionTypeRelation: any){
    let params = JSON.stringify(optionTypeRelation);
    let url = URL_SERVICES + '/option-type-relation/' + optionTypeRelation._id;  
    //revisar token
    url += '?token=' + localStorage.getItem('token'); 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, optionTypeRelation, { headers: headers });    
  }

  getOptionTypeRelationsByBetType(betTypeId: string){
    let url = URL_SERVICES + '/option-type-relations/' + betTypeId;    
    return this._http.get(url);
  }

  // getSpanishOptionTypeRelations(){
  //   let url = URL_SERVICES + '/option-type-relations';    
  //   return this._http.get(url);
  // }
}
