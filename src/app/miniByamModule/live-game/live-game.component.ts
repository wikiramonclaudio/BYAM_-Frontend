import { UserService } from './../../services/user/user.service';
import { MinibyamgameService } from './../services/minibyamgame.service';
import { MinibyamMatchService } from './../services/minibyam-match.service';
import { PlayerService } from './../services/player.service';
import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-live-game',
  templateUrl: './live-game.component.html',
  styleUrls: ['./live-game.component.css']
})
export class LiveGameComponent implements OnInit {

  events: any[] = [
    {
      type: 'amarilla'
    },
    {
      type: 'sustitución'
    },
    {
      type: 'gol'
    }
  ];

  littleEvents: [
    {
      type: 'roja'
    },
    {
      type: 'penalty'
    }
  ];
  gameDuration: 95;
  gamePlayers = [];
  localPlayers = [];
  awayPlayers = [];
  awayGameEvents = [];
  goalsLocalTeam = 0;
  goalsAwayTeam = 0;
  gameEvents: any[] = [];
  firstHalfFinished: Boolean = false;
  finished: Boolean = false;
  manOfTheMatch;
  displayChangesWindow = false;
  match: any;
  game: any;
  constructor(
    private userService: UserService,
    private playerService: PlayerService,
    private minibyamMatchService: MinibyamMatchService,
    private minibyamgameService: MinibyamgameService,
    private minibyamPlayerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.gamePlayers = this.playerService.getPlayers();
    this.getGame();
    $('.bg-minibyam-home').css('background-image', 'url(assets/images/minibyam/bg-stadium.jpg)');
  }

  getGame() {
    // obtener mi partida y si no existe crearla
    this.minibyamgameService.getGameByUser(this.userService.user._id).subscribe(
      (res: any) => {
        this.game = res.game;
        this.getMatch();
      }
    );
  }

  getMatch() {
    this.minibyamMatchService.getNextMatch(this.game.activeWeek, this.game.team._id).subscribe(
      (res: any) => {
        this.match = res.match;
        this.getAwayPlayers(this.match.awayteam.name, () => {
          this.getLocalPlayers(this.match.localteam.name, () => {
            this.initGame();
          });
        });
      }
    );
  }

  initGame(secondHalf: boolean = false) {
    console.log('jugadores visitantes', this.awayPlayers);
    console.log('jugadores Locales', this.localPlayers);

    var total = 0;
    for (var i = 0; i < this.localPlayers.length; i++) {
      total += this.localPlayers[i].level;
    }
    var localavg = Math.floor(total / this.awayPlayers.length);
    if(localavg > 74 )
      localavg += 20;

    // away team
    var totalAway = 0;
    for (var i = 0; i < this.awayPlayers.length; i++) {
      totalAway += this.awayPlayers[i].level;
    }
    var awayavg = Math.floor(totalAway / this.awayPlayers.length);
    if(awayavg > 74 )
      awayavg += 20;
    console.log('nivel medio ekipo local', Math.floor(localavg / 30));
    console.log('nivel medio ekipo visitante', Math.floor(awayavg / 30));

    // PASAR TODO ESTO AL BACKEND
    const duration = Math.floor(Math.random() * (50 - 45) + 45);
    // Local team
    const numberGoals = Math.floor(Math.random() * (Math.floor(localavg / 30) - 0) + 0);
    const yellowCardsNumber = Math.floor(Math.random() * (3 - 0) + 0);
    const redCardsNumber = Math.floor(Math.random() * (1 - 0) + 0);
    // away team
    const awaynumberGoals = Math.floor(Math.random() * (Math.floor(awayavg / 30) - 0) + 0);
    const awayyellowCardsNumber = Math.floor(Math.random() * (3 - 0) + 0);
    const awayredCardsNumber = Math.floor(Math.random() * (1 - 0) + 0);

    if (!secondHalf) {
      this.gameEvents.push({
        minute: 0,
        player: {},
        type: 'Empieza el partido'
      });
    }
    // equipo local
    for (let i = 0; i < numberGoals; i++) {
      const eventTime = (secondHalf == true) ? Math.floor(Math.random() * ((duration + 47) - 48) + 48) : Math.floor(Math.random() * (duration - 1) + 1);
      const randomPLayer = Math.floor(Math.random() * (this.localPlayers.length - 1) + 1);
      const eventPlayer = this.localPlayers[randomPLayer];
      this.gameEvents.push(
        {
          minute: eventTime,
          player: eventPlayer,
          type: 'Gol'
        }
      );
      this.goalsLocalTeam += 1;
      this.match.localteamgoals += 1;
    }

    for (let i = 0; i < yellowCardsNumber; i++) {
      const eventTime = (secondHalf == true) ? Math.floor(Math.random() * ((duration + 47) - 48) + 48) : Math.floor(Math.random() * (duration - 1) + 1);
      const randomPLayer = Math.floor(Math.random() * (this.localPlayers.length - 1) + 1);
      const eventPlayer = this.localPlayers[randomPLayer];

      this.gameEvents.push(
        {
          minute: eventTime,
          player: eventPlayer,
          type: 'amarilla'
        }
      );
    }

    for (let i = 0; i < redCardsNumber; i++) {
      const eventTime = (secondHalf == true) ? Math.floor(Math.random() * ((duration + 47) - 48) + 48) : Math.floor(Math.random() * (duration - 1) + 1);
      const randomPLayer = Math.floor(Math.random() * (this.localPlayers.length - 1) + 1);
      const eventPlayer = this.localPlayers[randomPLayer];
      this.gameEvents.push(
        {
          minute: eventTime,
          player: eventPlayer,
          type: 'roja'
        }
      );
    }
    this.gameEvents = this.gameEvents.sort(function (a, b) {
      if (a.minute > b.minute) {
        return 1;
      }
      if (a.minute < b.minute) {
        return -1;
      }
      return 0;
    });

    // EQUIPO VISITANTE
    if (!secondHalf) {
      this.awayGameEvents.push({
        minute: 0,
        player: {},
        type: 'Empieza el partido'
      });
    }
    for (let i = 0; i < awaynumberGoals; i++) {
      const eventTime = (secondHalf == true) ? Math.floor(Math.random() * ((duration + 47) - 48) + 48) : Math.floor(Math.random() * (duration - 1) + 1);
      const randomPLayer = Math.floor(Math.random() * (this.awayPlayers.length - 1) + 1);
      const eventPlayer = this.awayPlayers[randomPLayer];
      this.awayGameEvents.push(
        {
          minute: eventTime,
          player: eventPlayer,
          type: 'Gol'
        }
      );
      this.goalsAwayTeam += 1;
      this.match.awayteamgoals += 1;
    }

    for (let i = 0; i < awayyellowCardsNumber; i++) {
      const eventTime = (secondHalf == true) ? Math.floor(Math.random() * ((duration + 47) - 48) + 48) : Math.floor(Math.random() * (duration - 1) + 1);
      const randomPLayer = Math.floor(Math.random() * (this.awayPlayers.length - 1) + 1);
      const eventPlayer = this.awayPlayers[randomPLayer];

      this.awayGameEvents.push(
        {
          minute: eventTime,
          player: eventPlayer,
          type: 'amarilla'
        }
      );
    }

    for (let i = 0; i < awayredCardsNumber; i++) {
      const eventTime = (secondHalf == true) ? Math.floor(Math.random() * ((duration + 47) - 48) + 48) : Math.floor(Math.random() * (duration - 1) + 1);
      const randomPLayer = Math.floor(Math.random() * (this.awayPlayers.length - 1) + 1);
      const eventPlayer = this.awayPlayers[randomPLayer];
      this.awayGameEvents.push(
        {
          minute: eventTime,
          player: eventPlayer,
          type: 'roja'
        }
      );
    }
    this.awayGameEvents = this.awayGameEvents.sort(function (a, b) {
      if (a.minute > b.minute) {
        return 1;
      }
      if (a.minute < b.minute) {
        return -1;
      }
      return 0;
    });
    this.firstHalfFinished = true;
    if (secondHalf) {
      this.finished = true;
      setTimeout(() => {
        this.calculateMVP();
      }, 700);
    }
  }

  calculateMVP() {
    let totalPlayers = this.localPlayers.concat(this.awayPlayers);
    let playr = Math.floor(Math.random() * (totalPlayers.length - 1) + 1);
    this.manOfTheMatch = totalPlayers[playr];
    this.match.mvp = this.manOfTheMatch._id;

    this.minibyamMatchService.updateMatch(this.match).subscribe(
      (res: any) => {
        this.game.activeWeek = this.game.activeWeek + 1;
        this.minibyamgameService.updateGame(this.game).subscribe(
          (res: any) => {
            console.log('Perfectales se avanzo de jornada A seguir jugando en proxima jornada', res);
          }
        );
      }
    );
  }

  getLocalPlayers(teamname: string, next: Function) {
    this.minibyamPlayerService.getTeamPlayers(teamname).subscribe(
      (res: any) => {
        this.localPlayers = res.players;
        this.getTitularTeam(4, 4, 2, 'local', () => {
          next();
        });
      });
  }

  getAwayPlayers(teamname: string, next: Function) {
    this.minibyamPlayerService.getTeamPlayers(teamname).subscribe(
      (res: any) => {
        this.awayPlayers = res.players;
        this.getTitularTeam(4, 4, 2, 'away', () => {
          next();
        });
      });
  }

  getTitularTeam(numD, numC, numA, team, next) {
    var tofilterTeam;

    if (team == 'local')
      tofilterTeam = this.localPlayers;
    else
      tofilterTeam = this.awayPlayers;

    const porteros = tofilterTeam.filter((player: any) => {
      return player.position == 'P';
    });
    const defensas = tofilterTeam.filter((player: any) => {
      return player.position == 'D';
    });
    const medios = tofilterTeam.filter((player: any) => {
      return player.position == 'C';
    });
    const delanteros = tofilterTeam.filter((player: any) => {
      return player.position == 'A';
    });

    let titulares = [];
    const portero = tofilterTeam.find((player: any) => {
      return player.position == 'P';
    });

    titulares.push(portero);

    for (let i = 0; i < numD; i++) {
      for (let x = 0; x < tofilterTeam.length; x++) {
        tofilterTeam.forEach((el, index) => {
          if (el.position == 'D') {
            if (defensas.length < numD) {
              defensas.push(tofilterTeam[index])
              // tofilterTeam.splice(index, 1);
            }
          }
        });
      }
      if (i <= numD + 1 && defensas[i])
        titulares.push(defensas[i]);
    }
    for (let i = 0; i < numC; i++) {
      for (let x = 0; x < tofilterTeam.length; x++) {
        tofilterTeam.forEach((el, index) => {
          if (el.position == 'C') {
            if (medios.length < numC) {
              medios.push(tofilterTeam[index])
              // tofilterTeam.splice(index, 1);
            }
          }
        });
      }
      if (i <= numC + 1 && medios[i])
        titulares.push(medios[i]);
    }
    for (let i = 0; i < numA; i++) {
      for (let x = 0; x < tofilterTeam.length; x++) {
        tofilterTeam.forEach((el, index) => {
          if (el.position == 'A') {
            if (delanteros.length < numA) {
              delanteros.push(tofilterTeam[index])
              // tofilterTeam.splice(index, 1);
            }
          }
        });
      }
      if (i <= numA + 1 && delanteros[i])
        titulares.push(delanteros[i]);
    }
    if (team == 'local')
      this.localPlayers = titulares;
    else
      this.awayPlayers = titulares;

    next();
    // tofilterTeam = tofilterTeam.filter((el) => {
    //   return titulares.some(function (arrVal) {
    //     return el === arrVal;
    //   }) == false;
    // });
  }

}
