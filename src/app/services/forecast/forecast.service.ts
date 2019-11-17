import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import swal from 'sweetalert';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(
    public _http: HttpClient,
    public router: Router,    
  ) { }

  getForecasts(): Observable<any>{
    let url = URL_SERVICES + '/forecast';    
    return this._http.get(url);
  }

  getForecast(id: string): Observable<any>{
    let url = URL_SERVICES + '/forecast/' + id;    
    return this._http.get(url);
  }

  getBetForecasts(betId: string): Observable<any>{
    let url = URL_SERVICES + '/forecast/betforecasts/' + betId;    
    return this._http.get(url);
  }   

  deleteForecast(id: string, token: string){
    //PONER EL TOKEN
    let url = URL_SERVICES + '/forecast/' + id + '?token=' + localStorage.getItem('token');
    return this._http.delete(url);
  }

  createForecast(forecast: any) {
    let params = JSON.stringify(forecast);
    let url = URL_SERVICES + '/forecast'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      swal("Forecast registrado", " " + forecast.name, "success");
      return res.forecast;
    });
  }


  createManyForecasts(forecasts: any) {
    let params = JSON.stringify(forecasts);
    let url = URL_SERVICES + '/forecast/several'+ '?token=' + localStorage.getItem('token');    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, params, { headers: headers })
    .map((res: any)=>{
      // swal("Forecast registrado", " " + forecast.name, "success");
      return res;
    });
  }

  searchForecast(term: string){
    let url = URL_SERVICES + '/search/collection/forecast/' + term;
    return this._http.get(url).map(
      (response: any)=>{        
        console.log(response);
        return response.forecast;
      }
    )
  }

  updateForecast(forecast: any){
    let params = JSON.stringify(forecast);
    let url = URL_SERVICES + '/forecast/' + forecast._id;  
    //revisar token
    url += '?token=' + localStorage.getItem('token'); 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, forecast, { headers: headers });    
  }

  getForecastsByTable(tableId: string){    
    let url = URL_SERVICES + '/forecast/' + tableId;    
    return this._http.get(url);
  }

  checkForecastResult(choice: any, matchId: string){
    let params = JSON.stringify(choice);
    let url = URL_SERVICES + '/forecast/checkresult/' + matchId;  
    //revisar token
    url += '?token=' + localStorage.getItem('token'); 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(url, params, { headers: headers });    
  }

}
