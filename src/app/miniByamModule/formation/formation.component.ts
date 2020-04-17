import { PlayerService } from './../services/player.service';
import { MinibyamgameService } from './../services/minibyamgame.service';
import { UserService } from './../../services/user/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import swal from 'sweetalert';
import { PickListModule } from 'primeng/picklist';
import { DropdownModule } from 'primeng/dropdown';
declare var $;
@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  @Input() halfTime: boolean;
  tactic: any;
  tactics = [
    { label: '3-4-3', value: '3-4-3' },
    { label: '3-5-2', value: '3-5-2' },
    { label: '3-3-4', value: '3-3-4' },
    { label: '4-5-1', value: '4-5-1' },
    { label: '4-4-2', value: '4-4-2' },
    { label: '4-3-3', value: '4-3-3' },
    { label: '4-2-4', value: '4-2-4' },
    { label: '5-4-1', value: '5-4-1' },
    { label: '5-3-2', value: '5-3-2' },
    { label: '5-2-3', value: '5-2-3' }
  ];
  players = [
    {
      name: 'Raul Moñiguez',
      average: 65,
      pos: 'Por',
      sequence: 1
    },
    {
      name: 'Walter Periguayonson',
      average: 60,
      pos: 'C',
      sequence: 7
    },
    {
      name: 'Wilson Daniel',
      average: 59,
      pos: 'D',
      sequence: 4
    },
    {
      name: 'Nono',
      average: 61,
      pos: 'D',
      sequence: 5
    },
    {
      name: 'Croque',
      average: 68,
      pos: 'C',
      sequence: 7
    },
    {
      name: 'Davizuno',
      average: 61,
      pos: 'A',
      sequence: 9
    },

    {
      name: 'Iñigo Iñiguez',
      average: 68,
      pos: 'D',
      sequence: 2
    },
    {
      name: 'David Rodillackson',
      average: 71,
      pos: 'C',
      sequence: 8
    },
    {
      name: 'Juan Casillos',
      average: 71,
      pos: 'A',
      sequence: 11
    },
    {
      name: 'Jose Luis',
      average: 67,
      pos: 'C',
      sequence: 8
    },
    {
      name: 'Filipe',
      average: 57,
      pos: 'A',
      sequence: 9
    }
  ];
  selectedplayers = [
    {
      name: 'Federico Tornices',
      average: 65,
      pos: 'Por',
      sequence: 1
    },
    {
      name: 'Paco Ramirez',
      average: 68,
      pos: 'D',
      sequence: 2
    },
    {
      name: 'Felipe Robaesteras',
      average: 56,
      pos: 'D',
      sequence: 4
    },
    {
      name: 'Antonio Ramirez',
      average: 68,
      pos: 'D',
      sequence: 5
    },
    {
      name: 'Raul Stoickov',
      average: 64,
      pos: 'A',
      sequence: 10
    },
    {
      name: 'Koko',
      average: 58,
      pos: 'C',
      sequence: 6
    },
    {
      name: 'None',
      average: 65,
      pos: 'C',
      sequence: 6
    },
    {
      name: 'Jose Manuel Rodrigales',
      average: 65,
      pos: 'D',
      sequence: 3
    },
    {
      name: 'Roberto Flipales',
      average: 65,
      pos: 'Por',
      sequence: 1
    },
    {
      name: 'Tornices',
      average: 67,
      pos: 'C',
      sequence: 7
    },
  ];
  titulares = [];
  reservas = [];
  totalPlayers = [];
  constructor(
    private router: Router,
    private userService: UserService,
    private minibyamGameService: MinibyamgameService,
    private minibyamPlayerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.getPlayers();
    // const wrapper: any = document.querySelector('.bg-minibyam-home');
    if (!this.halfTime)
      $('.bg-minibyam-home').css('background-image', 'url(assets/images/minibyam/vestuario.jpg)');
  }

  changeTactic() {
    switch (this.tactic) {
      case '3-4-3':
        this.updateTitularTeam(3, 4, 3);
        break;
      case '3-5-2':
        this.updateTitularTeam(3, 5, 2);
        break;
      case '3-3-4':
        this.updateTitularTeam(3, 3, 4);
        break;
      case '4-5-1':
        this.updateTitularTeam(4, 5, 1)
        break;
      case '4-4-2':
        this.updateTitularTeam(4, 4, 2)
        break;
      case '4-3-3':
        this.updateTitularTeam(4, 3, 3)
        break;
      case '4-2-4':
        this.updateTitularTeam(4, 2, 4)
        break;
      case '5-4-1':
        this.updateTitularTeam(5, 4, 1)
        break;
      case '5-3-2':
        this.updateTitularTeam(5, 3, 2)
        break;
      case '5-2-3':
        this.updateTitularTeam(5, 2, 3)
        break;
    }
  }

  updateTitularTeam(numD, numC, numA) {
    const porteros = this.players.filter((player: any) => {
      return player.position == 'P';
    });
    const defensas = this.players.filter((player: any) => {
      return player.position == 'D';
    });
    const medios = this.players.filter((player: any) => {
      return player.position == 'C';
    });
    const delanteros = this.players.filter((player: any) => {
      return player.position == 'A';
    });

    let titulares = [];
    const portero = this.players.find((player: any) => {
      return player.position == 'P';
    });

    titulares.push(portero);

    for (let i = 0; i < numD; i++) {
      for (let x = 0; x < this.reservas.length; x++) {
        this.reservas.forEach((el, index) => {
          if (el.position == 'D') {
            if (defensas.length < numD) {
              defensas.push(this.reservas[index])
              this.reservas.splice(index, 1);
            }
          }
        });
      }
      if (i <= numD + 1 && defensas[i])
        titulares.push(defensas[i]);
    }
    for (let i = 0; i < numC; i++) {
      for (let x = 0; x < this.reservas.length; x++) {
        this.reservas.forEach((el, index) => {
          if (el.position == 'C') {
            if (medios.length < numC) {
              medios.push(this.reservas[index])
              this.reservas.splice(index, 1);
            }
          }
        });
      }
      if (i <= numC + 1 && medios[i])
        titulares.push(medios[i]);
    }
    for (let i = 0; i < numA; i++) {
      for (let x = 0; x < this.reservas.length; x++) {
        this.reservas.forEach((el, index) => {
          if (el.position == 'A') {
            if (delanteros.length < numA) {
              delanteros.push(this.reservas[index])
              this.reservas.splice(index, 1);
            }
          }
        });
      }
      if (i <= numA + 1 && delanteros[i])
        titulares.push(delanteros[i]);
    }
    this.titulares = titulares;
    this.reservas = this.players.filter((el) => {
      return this.titulares.some(function (arrVal) {
        return el === arrVal;
      }) == false;
    })
  }

  checkTitulares() {
    this.reservas = this.reservas.sort(function (a:any, b:any) {
      if (a.position < b.position) {
        return 1;
      }
      if (a.position > b.position) {
        return -1;
      }
      return 0;
    });
    this.titulares = this.titulares.sort(function (a:any, b:any) {
      if (a.position < b.position) {
        return 1;
      }
      if (a.position > b.position) {
        return -1;
      }
      return 0;
    });
  }

  playGame() {
    if (this.titulares.length != 11) {
      swal('Error', 'El número de jugadores titulares debe ser 11, revisa tu equipo titular y asegúrate que has seleccionado 11 jugadores titulares.', 'warning');
    } else {
      this.router.navigate(['/minibyam/livegame']);
    }
  }

  // get team players
  getPlayers() {
    this.minibyamGameService.getGameByUser(this.userService.user._id).subscribe(
      (res: any) => {
        this.minibyamPlayerService.getTeamPlayers(res.game.team.name).subscribe(
          (res: any) => {
            this.players = res.players;
            this.updateTitularTeam(4, 4, 2);
            // let titulares = this.players.filter((player: any) => {
            //   return player.status == 'T';
            // });
            // let reservas = this.players.filter((player: any) => {
            //   return player.status == 'B';
            // });
            // this.titulares = titulares.sort(function (a: any, b: any) {
            //   if (a.position < b.position) {
            //     return 1;
            //   }
            //   if (a.position > b.position) {
            //     return -1;
            //   }
            //   return 0;
            // });
            // this.reservas = reservas.sort(function (a: any, b: any) {
            //   if (a.position > b.position) {
            //     return 1;
            //   }
            //   if (a.position < b.position) {
            //     return -1;
            //   }
            //   return 0;
            // });
            // this.totalPlayers = this.titulares.concat(this.reservas);
          }
        );
      }
    );


    //  OBTENER JUGADORES ITALIA
    // this.userService.getJurorores().subscribe(
    //   (res: any) => {
    //     res.players.forEach(element => {
    //         element.onSale = false;
    //         element.goals = 0;
    //         element.level = Math.floor(Math.random() * (95 - 65) + 65);
    //         element.country = 'italy';
    //         element.team = element.team.charAt(0).toUpperCase() + element.team.slice(1);
    //         element.mvps = 0;
    //         element.status = '';
    //     });
    //     this.exportToJsonFile(res.players);
    //     var teamsList = [];
    // res.players.forEach((value, index, array) => {
    //     if( !teamsList.includes(value.team) ){
    //       teamsList.push(value.team)
    //     }
    // });
    //  res.players.forEach(element => {
    //   if ( !teamsList.includes(element.team) ) {
    //     teamsList.push(element.team)
    //   }
    // });
    // console.log('Equipolos', teamsList);
    // var finalTeamsList = [];
    // teamsList.forEach(
    //   (team, index, array) => {
    //     var newteam = {
    //       name: team.charAt(0).toUpperCase() + team.slice(1),
    //       points: 0,
    //       code: team.substring(0, 3).toUpperCase(),
    //       stadium: 'Nuevo Cabezuelo',
    //       money: 2000000,
    //       country: 'Italy'
    //     };
    //     finalTeamsList.push(newteam);
    //   }
    // );
    // this.exportToJsonFile(finalTeamsList);
    //   }
    // );
  }

  // exportToJsonFile(jsonData) {
  //   let dataStr = JSON.stringify(jsonData);
  //   let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  //   let exportFileDaultName = 'jugadoresItaly.json';

  //   let linkElement = document.createElement('a');
  //   linkElement.setAttribute('href', dataUri);
  //   linkElement.setAttribute('download', exportFileDaultName);
  //   linkElement.click();
  // }



}
