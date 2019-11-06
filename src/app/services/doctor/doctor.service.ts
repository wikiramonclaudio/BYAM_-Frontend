import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file.service';
import { Observable } from 'rxjs/Observable';
import { URL_SERVICES } from 'src/app/config/config';
import swal from 'sweetalert';
import { Doctor } from 'src/app/models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    public _http: HttpClient,
    public router: Router,
    public uploadService: UploadFileService
  ) { }

  getDoctors(): Observable<any>{
    let url = URL_SERVICES + '/doctor';    
    return this._http.get(url);
  }

  getHospital(id: string): Observable<any>{
    let url = URL_SERVICES + '/doctor/' + id;    
    return this._http.get(url);
  }

  getDoctor(id: string): Observable<any>{
    let url = URL_SERVICES + '/doctor/' + id;    
    return this._http.get(url);
  }

  deleteDoctor(id: string, token: string){
    //PONER EL TOKEN
    let url = URL_SERVICES + /doctor/ + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createDoctor(doctor: any, token: string) {
    let params: any = JSON.stringify(doctor);
    let url = URL_SERVICES + '/doctor'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{      
      swal("Doctor registrado",res.savedDoctor.name, "success");
      return res.savedDoctor;
    });
  }

  searchDoctor(term: string){
    let url = URL_SERVICES + '/search/collection/doctor/' + term;
    return this._http.get(url).map(
      (response: any)=>{        
        console.log(response);
        return response.doctor;
      }
    )
  }

  updateDoctor(doctor: any){
    let params = JSON.stringify(doctor);
    let url = URL_SERVICES + '/doctor/' + doctor._id;  
    //revisar token
    url += '?token=' + localStorage.getItem('token'); 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, doctor, { headers: headers });    
  }
}
