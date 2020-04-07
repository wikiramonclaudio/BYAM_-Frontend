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
  awayGameEvents = [];
  goalsLocalTeam = 0;
  goalsAwayTeam = 0;
  gameEvents: any[] = [];
  firstHalfFinished: Boolean = false;
  finished: Boolean = false;
  manOfTheMatch;
  displayChangesWindow = false;
  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.gamePlayers = this.playerService.getPlayers();
    this.initGame();
    $('.bg-minibyam-home').css('background-image', 'url(assets/images/minibyam/bg-stadium.jpg)');
  }

  initGame(secondHalf: boolean = false) {
    // PASAR TODO ESTO AL BACKEND
    const duration = Math.floor(Math.random() * (50 - 45) + 45);
    const numberGoals = Math.floor(Math.random() * (3 - 0) + 0);
    const yellowCardsNumber = Math.floor(Math.random() * (3 - 0) + 0);
    const redCardsNumber = Math.floor(Math.random() * (1 - 0) + 0);

    const awaynumberGoals = Math.floor(Math.random() * (3 - 0) + 0);
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
      const randomPLayer = Math.floor(Math.random() * (this.gamePlayers.length - 1) + 1);
      const eventPlayer = this.gamePlayers[randomPLayer];
      this.gameEvents.push(
        {
          minute: eventTime,
          player: eventPlayer,
          type: 'Gol'
        }
      );
      this.goalsLocalTeam += 1;
    }

    for (let i = 0; i < yellowCardsNumber; i++) {
      const eventTime = (secondHalf == true) ? Math.floor(Math.random() * ((duration + 47) - 48) + 48) : Math.floor(Math.random() * (duration - 1) + 1);
      const randomPLayer = Math.floor(Math.random() * (this.gamePlayers.length - 1) + 1);
      const eventPlayer = this.gamePlayers[randomPLayer];

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
      const randomPLayer = Math.floor(Math.random() * (this.gamePlayers.length - 1) + 1);
      const eventPlayer = this.gamePlayers[randomPLayer];
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
      const randomPLayer = Math.floor(Math.random() * (this.gamePlayers.length - 1) + 1);
      const eventPlayer = this.gamePlayers[randomPLayer];
      this.awayGameEvents.push(
        {
          minute: eventTime,
          player: eventPlayer,
          type: 'Gol'
        }
      );
      this.goalsAwayTeam += 1;
    }

    for (let i = 0; i < awayyellowCardsNumber; i++) {
      const eventTime = (secondHalf == true) ? Math.floor(Math.random() * ((duration + 47) - 48) + 48) : Math.floor(Math.random() * (duration - 1) + 1);
      const randomPLayer = Math.floor(Math.random() * (this.gamePlayers.length - 1) + 1);
      const eventPlayer = this.gamePlayers[randomPLayer];

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
      const randomPLayer = Math.floor(Math.random() * (this.gamePlayers.length - 1) + 1);
      const eventPlayer = this.gamePlayers[randomPLayer];
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
      setTimeout(()=>{
        this.calculateMVP();
      },700);
    }
  }

  calculateMVP(){
    // let golesLocales = this.localGameEvents.filter((ev)=>{
    //   return ev.type == 'Gol';
    // });
    // let golesVisitantes = this.awayGameEvents.filter((ev)=>{
    //   return ev.type == 'Gol';
    // });
    let playr = Math.floor(Math.random() * (this.gamePlayers.length - 1) + 1);
    console.log('MAN OF THE MATCH', this.gamePlayers[playr]);
    this.manOfTheMatch = this.gamePlayers[playr];
    // alert('EL MAN OF THE MATCH ES', playr.name);
  }

}
