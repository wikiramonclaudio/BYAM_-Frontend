import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { User } from 'src/app/models/user.model';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  users:User[] = [];
  doctors:Doctor[] = [];
  hospitals:Hospital[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
      activatedRoute.params.subscribe(params=>{
        let termino = params.term;
        this.search(termino);
      });
   }

  ngOnInit() {
  }

  search(term:string){
    let url = URL_SERVICES + '/search/all/' + term;
    this.http.get(url).subscribe(
      (response: any)=>{
        console.log(response);
        this.hospitals = response.hospitals;
        this.doctors = response.doctors;
        this.users = response.users;
      }
    );
  }

}
