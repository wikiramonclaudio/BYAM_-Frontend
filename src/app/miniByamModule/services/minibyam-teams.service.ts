import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class MinibyamTeamsService {

  teams: any[] = [];
  constructor(
    private _http: HttpClient
  ) {
    this.teams = [
      {
        key: 'barcelona',
        name: 'FC Barcelona',
        code: 'BAR',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'espanyol',
        name: 'RCD Espanyol',
        code: 'ESP',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'madrid',
        name: 'Real Madrid',
        code: 'RMD',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'atletico',
        name: 'Atlético Madrid',
        code: 'ATL',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'getafe',
        name: 'Getafe CF',
        code: 'GET',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'sevilla',
        name: 'Sevilla FC',
        code: 'SEV',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'valencia',
        name: 'Valencia CF',
        code: 'VAL',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'levante',
        name: 'Levante UD',
        code: 'LEV',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'athletic',
        name: 'Athletic Club Bilbao',
        code: 'ATH',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'granada',
        name: 'Granada CF',
        code: 'GRA',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'celta',
        name: 'RC Celta Vigo',
        code: 'CEL',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'realsociedad',
        name: 'Real Sociedad',
        code: 'RSO',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'valladolid',
        name: 'Real Valladolid CF',
        code: 'VID',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'eibar',
        name: 'SD Eibar',
        code: 'null',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'betis',
        name: 'Real Betis',
        code: 'BET',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'osasuna',
        name: 'CA Osasuna',
        code: 'OSA',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'villareal',
        name: 'Villarreal CF',
        code: 'VLL',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'alaves',
        name: 'Deportivo Alavés',
        code: 'null',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'mallorca',
        name: 'RCD Mallorca',
        code: 'MLL',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        key: 'leganes',
        name: 'CD Leganés',
        code: 'LEG',
        money: 10000000,
        stadium: 'Nuevo Robaesteras',
        points: 7,
      },
      {
        name: 'Ajax de Palomeras',
        // sequence: 7,
        points: 10,
        stadium: 'Cabezuelas Arena',
        money: 1000000
      },
      {
        name: 'Inter de Vallekas',
        // sequence: 7,
        points: 0,
        stadium: 'Peters Arena',
        money: 1000000
      },
      {
        name: 'CDV',
        // sequence: 7,
        points: 3,
        stadium: 'Nuevo Cabezuelo',
        money: 1000000
      },
      {
        name: 'EL clab',
        // sequence: 7,
        points: 2,
        stadium: 'AS La Troladera',
        money: 1000000
      },
      {
        name: 'CD Rayo Pallecano',
        // sequence: 7,
        points: 0,
        stadium: 'Nuevo Pallekas',
        money: 1000000
      },
      {
        name: 'Tuercebotas CF',
        // sequence: 7,
        points: 1,
        stadium: 'Nuevo Vallekas',
        money: 1000000
      },
      {
        name: 'CD Pudrecolchones',
        // sequence: 7,
        points: 0,
        stadium: 'Colchones Arena',
        money: 1000000
      },
      {
        name: 'Troledo',
        // sequence: 7,
        points: 5,
        stadium: 'Nueva Trola',
        money: 1000000
      },
      {
        name: 'Sevillackson',
        // sequence: 7,
        points: 0,
        stadium: 'Nuevo Aragón',
        money: 1000000
      },
      {
        name: 'Bercelona',
        // sequence: 7,
        points: 2,
        stadium: 'Nuevo Berceloneta',
        money: 1000000
      },
      {
        name: 'Ral Marrid',
        // sequence: 7,
        points: 8,
        stadium: 'Valdebrevas',
        money: 1000000
      },
      {
        name: 'Alieti',
        // sequence: 7,
        points: 0,
        stadium: 'Carderillonson',
        money: 1000000
      },
      {
        name: 'Chealki',
        // sequence: 7,
        points: 3,
        stadium: 'Vallekas road',
        money: 1000000
      }
    ];
   }

  getTeams(){
    let url = URL_SERVICES + '/minibyam/team';
    return this._http.get(url);
  }

  getFakeTeams(){
    return this.teams;
  }
}
