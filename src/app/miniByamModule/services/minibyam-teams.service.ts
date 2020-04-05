import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MinibyamTeamsService {

  teams: any[] = [];
  constructor() {
    this.teams = [
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
    return this.teams;
  }
}
