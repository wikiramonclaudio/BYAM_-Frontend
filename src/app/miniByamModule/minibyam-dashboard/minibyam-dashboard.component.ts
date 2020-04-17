import { MinibyamMatchService } from './../services/minibyam-match.service';
import { MinibyamgameService } from './../services/minibyamgame.service';
import { UserService } from './../../services/user/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
declare var $;
@Component({
  selector: 'app-minibyam-dashboard',
  templateUrl: './minibyam-dashboard.component.html',
  styleUrls: ['./minibyam-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MinibyamDashboardComponent implements OnInit {
  game: any = {team:{name: ''}, user: {name: '', image: ''}};
  nextMatch: any;
  constructor(
    public router: Router,
    private userService: UserService,
    private minibyamgameService: MinibyamgameService,
    private minibyamMatchService: MinibyamMatchService
  ) { }

  ngOnInit(): void {
    $('.bg-minibyam-home').css('background-image', 'url(assets/images/minibyam/bg-stadium.png)');
    $('.bg-minibyam-home').addClass('animated fadeIn');

    this.getGame();
  }

  getGame(){
    // obtener mi partida y si no existe crearla
    this.minibyamgameService.getGameByUser(this.userService.user._id).subscribe(
      (res: any) => {
        this.game = res.game;
        this.getNextMatch();
      }
    );
  }

  getNextMatch(){
    this.minibyamMatchService.getNextMatch(this.game.activeWeek, this.game.team._id).subscribe(
      (res: any) => {
        console.log('SIGUIENTE PARTIDO ES --> ', res);
        this.nextMatch = res.match;
      }
    );
  }

}
