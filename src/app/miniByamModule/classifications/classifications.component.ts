import { PlayerService } from './../services/player.service';
import { MinibyamTeamsService } from './../services/minibyam-teams.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classifications',
  templateUrl: './classifications.component.html',
  styleUrls: ['./classifications.component.css']
})
export class ClassificationsComponent implements OnInit {

  teams: any[] = [];
  columns: any[] = [];
  players: any[] = [];
  display = false;
  constructor(
    private teamsService: MinibyamTeamsService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.teams = this.teamsService.getFakeTeams();
    this.players = this.playerService.getPlayers();
    this.players = this.players.filter((player)=>{
      return player.pos != 'Def' && player.pos != 'Por';
    });
    this.players.forEach((value, index, array) => {
      value.display = false;
    });
    this.teams = this.teams.sort(function (a, b) {
      if (a.points < b.points) {
        return 1;
      }
      if (a.points > b.points) {
        return -1;
      }
      return 0;
    });
    // this.teams.forEach(element => {
    //   element.text = element.name;
    //   element.dataField = element.name;
    // });
    // this.columns = [
    //   { text: 'Posiciión', dataField: 'pos', width: 70 },
    //   { text: 'Equipo', dataField: 'team', width: 200 },
    //   { text: 'Puntos', dataField: 'points', width: 70 },
    // ];
  }

}
