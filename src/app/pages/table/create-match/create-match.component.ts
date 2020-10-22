import { LeagueService } from './../../../services/league/league.service';
import { MatchService } from './../../../services/match/match.service';
import { Match } from './../../../models/match.model';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/translation.service';
import swal from 'sweetalert';
declare var $;

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css']
})
export class CreateMatchComponent implements OnInit {
  match: Match = new Match('', '', '', '', '', '');
  matches: Match[];
  leagues: any[] = [];
  clubs: any[] = [];
  club: any;
  league: any;
  translate: TranslateService;
  sport = '';
  tennisTournament = '';
  constructor(
    private matchService: MatchService,
    public translationService: TranslationService,
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
    this.getLeagues();
    this.translate = this.translationService.getTranslateService();
  }

  createMatch() {
    this.match.where = 'SEGOVIA';
    if (this.sport == 'Tennis') {
      this.match.sport = 'Tennis';
      this.match.tournament == this.tennisTournament;
    }
    if (this.match.localteam != this.match.awayteam) {
      this.matchService.createMatch(this.match).subscribe(
        res => {
          this.match.localteam = '';
          this.match.awayteam = '';
          this.match.when = '';
        }
      );
    } else {
      swal('Error', 'El equipo local no puede coincidir con el equipo visitante, revisa la selección de equipos', 'error');
    }

  }

  getLeagues() {
    this.leagueService.getLeagues().subscribe(
      (res: any) => {
        this.leagues = res.leagues;
        if (res.leagues.length > 0) {
          this.league = res.leagues[0];
          this.clubs = this.league.clubs.sort((a, b) => a.name.localeCompare(b.name));
        }
        this.match.localteam = '';
        this.match.awayteam = '';
        $('select').each(function () {
          const $this = $(this), numberOfOptions = $(this).children('option').length;

          $this.addClass('select-hidden');
          $this.wrap('<div class="select"></div>');
          $this.after('<div class="select-styled"></div>');

          const $styledSelect = $this.next('div.select-styled');
          $styledSelect.text($this.children('option').eq(0).text());

          const $list = $('<ul />', {
            'class': 'select-options'
          }).insertAfter($styledSelect);

          for (let i = 0; i < numberOfOptions; i++) {
            $('<li />', {
              text: $this.children('option').eq(i).text(),
              rel: $this.children('option').eq(i).val()
            }).appendTo($list);
          }

          const $listItems = $list.children('li');

          $styledSelect.click(function (e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function () {
              $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
          });

          $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
          });

          $(document).click(function () {
            $styledSelect.removeClass('active');
            $list.hide();
          });

        });
      }
    );
  }

  changeLeague(league: any) {
    this.match.sport = JSON.parse(league).sport;
    this.sport = JSON.parse(league).sport;
    this.clubs = JSON.parse(this.league).clubs.sort((a, b) => a.name.localeCompare(b.name));
    this.match.tournament = this.league.name;
  }

}
