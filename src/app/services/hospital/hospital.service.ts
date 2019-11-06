import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
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
export class HospitalService {

  constructor(
    public _http: HttpClient,
    public router: Router,
    public uploadService: UploadFileService
  ) { }

  getHospitals(): Observable<any>{
    let url = URL_SERVICES + '/hospital';    
    return this._http.get(url);
  }

  getHospital(id: string): Observable<any>{
    let url = URL_SERVICES + '/hospital/' + id;    
    return this._http.get(url);
  }

  deleteHospital(id: string, token: string){
    //PONER EL TOKEN
    let url = URL_SERVICES + /hospital/ + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createHospital(hospital: any, token: string) {
    let params = JSON.stringify(hospital);
    let url = URL_SERVICES + '/hospital'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      swal("Hospital registrado", " " + hospital.name, "success");
      return res.hospital;
    });
  }

  searchHospital(term: string){
    let url = URL_SERVICES + '/search/collection/hospital/' + term;
    return this._http.get(url).map(
      (response: any)=>{        
        console.log(response);
        return response.hospital;
      }
    )
  }

  updateHospital(hospital: any){
    let params = JSON.stringify(hospital);
    let url = URL_SERVICES + '/hospital/' + hospital._id;  
    //revisar token
    url += '?token=' + localStorage.getItem('token'); 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, hospital, { headers: headers });    
  }
}
