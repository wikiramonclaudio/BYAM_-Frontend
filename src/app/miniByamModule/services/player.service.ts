import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  players = [
    {
      name: 'Raul Moñiguez',
      average: 65,
      pos: 'Por',
      sequence: 1,
      goals: 0,
      team: 'Ajax de Palomeras',
      onSale: false
    },
    {
      name: 'Walter Periguayonson',
      average: 60,
      pos: 'Med',
      sequence: 7,
      goals: 0,
      team: 'CDV',
      onSale: false
    },
    {
      name: 'Wilson Daniel',
      average: 59,
      pos: 'Def',
      sequence: 4,
      goals: 0,
      team: 'CD Rayo Pallecano',
      onSale: false
    },
    {
      name: 'Nono',
      average: 61,
      pos: 'Def',
      sequence: 5,
      goals: 0,
      team: 'Ajax de Palomeras',
      onSale: false
    },
    {
      name: 'Croque',
      average: 68,
      pos: 'Med',
      sequence: 7,
      goals: 0,
      team: 'Tuercebotas CF',
      onSale: false
    },
    {
      name: 'Davizuno',
      average: 61,
      pos: 'Del',
      sequence: 9,
      goals: 0,
      team: 'Ajax de Palomeras',
      onSale: false
    },

    {
      name: 'Iñigo Iñiguez',
      average: 68,
      pos: 'Def',
      sequence: 2,
      goals: 0,
      team: 'Tuercebotas CF',
      onSale: false
    },
    {
      name: 'David Rodillackson',
      average: 71,
      pos: 'Med',
      sequence: 8,
      goals: 0,
      team: 'Sevillackson',
      onSale: false
    },
    {
      name: 'Juan Casillos',
      average: 71,
      pos: 'Del',
      sequence: 11,
      goals: 0,
      team: 'Ajax de Palomeras',
      onSale: false
    },
    {
      name: 'Jose Luis',
      average: 67,
      pos: 'Med',
      sequence: 8,
      goals: 0,
      team: 'Troledo',
      onSale: false
    },
    {
      name: 'Filipe',
      average: 57,
      pos: 'Del',
      sequence: 9,
      goals: 0,
      team: 'Troledo',
      onSale: false
    }
  ];
  selectedplayers = [
    {
      name: 'Federico Tornices',
      average: 65,
      pos: 'Por',
      sequence: 1,
      goals: 0,
      team: 'Troledo',
      onSale: false
    },
    {
      name: 'Paco Ramirez',
      average: 68,
      pos: 'Def',
      sequence: 2,
      goals: 0,
      team: 'Ajax de Palomeras',
      onSale: false
    },
    {
      name: 'Felipe Robaesteras',
      average: 56,
      pos: 'Def',
      sequence: 4,
      goals: 0,
      team: 'CDV',
      onSale: false
    },
    {
      name: 'Antonio Ramirez',
      average: 68,
      pos: 'Def',
      sequence: 5,
      goals: 0,
      team: 'CDV',
      onSale: false
    },
    {
      name: 'Raul Stoickov',
      average: 64,
      pos: 'Del',
      sequence: 10,
      goals: 0,
      team: 'CDV',
      onSale: false
    },
    {
      name: 'Koko',
      average: 58,
      pos: 'Med',
      sequence: 6,
      goals: 0,
      team: 'Ajax de Palomeras',
      onSale: false
    },
    {
      name: 'None',
      average: 65,
      pos: 'Med',
      sequence: 6,
      goals: 0,
      team: 'Ajax de Palomeras',
      onSale: false
    },
    {
      name: 'Jose Manuel Rodrigales',
      average: 65,
      pos: 'Def',
      sequence: 3,
      goals: 0,
      team: 'Ajax de Palomeras',
      onSale: false
    },
    {
      name: 'Roberto Flipales',
      average: 65,
      pos: 'Por',
      sequence: 1,
      goals: 0,
      team: 'Ajax de Palomeras',
      onSale: false
    },
    {
      name: 'Tornices',
      average: 67,
      pos: 'Med',
      sequence: 7,
      goals: 0,
      team: 'Ajax de Palomeras',
      onSale: false
    },
  ];
  totalPlayers = [];
  constructor() {
    this.totalPlayers = this.players.concat(this.selectedplayers);
  }

  getPlayers(){
    return this.totalPlayers;
  }
}
