import { MinibyamMatchService } from './../services/minibyam-match.service';
import { UserService } from './../../services/user/user.service';
import { MinibyamgameService } from './../services/minibyamgame.service';
import { MinibyamTeamsService } from './../services/minibyam-teams.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogModule, Dialog } from 'primeng/dialog';
import swal from 'sweetalert';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  display = false;
  teams: any[] = [];
  selectedTeam;
  game: any = {team: {name: ''}, user: {name: '', image: ''}};
  originalTeams: any;
  constructor(
    private router: Router,
    private teamsService: MinibyamTeamsService,
    private minibyamGameService: MinibyamgameService,
    private minibyamMatchService: MinibyamMatchService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getTeams();
  }

  newLeague(type: string) {
    const el: any = { content: 'input', inputValue: '' };
    swal('Nombre de la partida - ' + type, el).then((value) => {
      if (value.length > 2) {
        this.router.navigate(['minibyam/minibyam-dashboard']);
      }
    });
  }

  getTeams() {
    this.teamsService.getTeams().subscribe(
      (res: any) => {
        this.originalTeams = res.teams;
        res.teams.forEach((team, index, array) => {
          this.teams.push({
            label: team.name, value: team
          });
        });
        this.getGameByUser();
      }
    );
  }

  getGameByUser() {
    this.minibyamGameService.getGameByUser(this.userService.user._id).subscribe(
      (res: any) => {
        console.log('res', res);
        if (!res.game) {
            // this.createCalendar();
        } else {
          this.game = res.game;
          this.router.navigate(['minibyam/minibyam-dashboard']);
        }
      },
      (err: any) => {
        console.log('ERROROLO', err);
      }
    );
  }

  play() {
    if (this.selectedTeam) {
      this.createNewGame();
    } else {
      alert('Selecciona un equipo');
    }
  }

  createNewGame() {
    this.minibyamGameService.createGame({ user: this.userService.user._id, team: this.selectedTeam._id }).subscribe(
      (res: any) => {
        this.game = res.game;
        console.log('TENEMOS EL GAME', res);
        this.testCalendar();
        // this.router.navigate(['minibyam/minibyam-dashboard']);
      }
    );
  }

  // getGame(){
  //   // obtener mi partida y si no existe crearla
  //   this.minibyamGameService.getGameByUser(this.userService.user._id).subscribe(
  //     (res: any) => {
  //       this.game = res.game;
  //     }
  //   );
  // }

  // PARA PASAR AL BACKEND
  createCalendar() {
    let jornadas = [];
    const filteredTeams = this.originalTeams.filter((element) => {
      return this.game.team != element._id;
    });
    filteredTeams.forEach(
      (team, index, array) => {
        // const randomNum = Math.floor(Math.random() * (filteredTeams.length - 0) + 0);
        // var randomteam = filteredTeams[randomNum];

        let newMatch = {
          localteam: this.game.team,
          awayteam: team._id,
          week: index + 1,
          localteamgoals: 0,
          awayteamgoals: 0,
          mvp: null,
          game: this.game._id
        };
        jornadas.push(newMatch);
      }
    );
    this.minibyamMatchService.createCalendar(jornadas).subscribe(
      res => {
        this.router.navigate(['minibyam/minibyam-dashboard']);
      }
    );
  }

  testCalendar() {
    if (this.game && this.game._id) {

      let paitidos = [];
      this.originalTeams.forEach(
          (team, index, array) => {
            const filteredTeams = this.originalTeams.filter((element) => {
              return team._id != element._id;
            });
            filteredTeams.forEach((awayTeam, i, arr) => {
              let newMatch = {
                localteam: team._id,
                awayteam: awayTeam._id,
                week: index + 1,
                localteamgoals: 0,
                awayteamgoals: 0,
                mvp: null,
                game: this.game._id
              };
              paitidos.push(newMatch);
            });
        }
      );
      this.minibyamMatchService.createCalendar(paitidos).subscribe(
        res => {
          this.router.navigate(['minibyam/minibyam-dashboard']);
        }
      );
    } else {
      alert('NO has creado todavia el juegolo');
    }

  }
}
