import { ForecastService } from './../../../services/forecast/forecast.service';
import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { MatchTypeRelationService } from 'src/app/services/matchTypeRelation/match-type-relation.service';

@Component({
  selector: 'app-check-matches',
  templateUrl: './check-matches.component.html',
  styleUrls: ['./check-matches.component.css']
})
export class CheckMatchesComponent implements OnInit {

  matchTypeRelations: any[] = [];
  matches: Match[] = [];
  constructor(
    private forecastService: ForecastService,
    private matchTypeRelationService: MatchTypeRelationService,
  ) { }

  ngOnInit() {
    this.getMatches();
  }

  getMatches() {
    this.matchTypeRelationService.getMatchTypeRelations(true).subscribe(
      (res: any) => {
        const uniqueArray = res.matchTypeRelation.filter((match, index) => {
          if (match.match && match.match._id) {
            const _match = match.match._id;
            return  (match.finished != true && index === res.matchTypeRelation.findIndex(obj => {
              if (obj.match) {
                return obj.match._id === _match;
              }
            }));
          }
        });
        this.matchTypeRelations = uniqueArray;
        console.log(this.matchTypeRelations);
      });
  }

  toggleOption(matchByTable, optionNumber, optionId: string) {
    if (optionNumber == 1) {
      matchByTable.bettype.option1.selected = true;
      matchByTable.bettype.option2.selected = false;
      if (matchByTable.bettype.option3) {
        matchByTable.bettype.option3.selected = false;
      }
    }
    if (optionNumber == 2) {
      matchByTable.bettype.option2.selected = true;
      matchByTable.bettype.option1.selected = false;
      if (matchByTable.bettype.option3) {
        matchByTable.bettype.option3.selected = false;
      }
    }
    if (optionNumber == 3) {
      matchByTable.bettype.option3.selected = true;
      matchByTable.bettype.option2.selected = false;
      matchByTable.bettype.option1.selected = false;
    }

  }

  setForecastResult(matchByTable: any, match: any) {
    let selectedChoice: any = {};
    if (matchByTable.bettype.option2.selected) {
      selectedChoice = matchByTable.bettype.option2;
    }
    if (matchByTable.bettype.option1.selected) {
      selectedChoice = matchByTable.bettype.option1;
    }
    if (matchByTable.bettype.option3 && matchByTable.bettype.option3.selected) {
      selectedChoice = matchByTable.bettype.option3;
    }
      selectedChoice.localteamgoals = match.localteamgoals;
      selectedChoice.awayteamgoals = match.awayteamgoals;
      selectedChoice.goals = match.localteamgoals + match.awayteamgoals;

    this.forecastService.checkForecastResult(selectedChoice, match._id).subscribe(
      res => {
        matchByTable.finished = true;
        this.matchTypeRelationService.updateMatchTypeRelation(matchByTable).subscribe(data => {
          console.log('Checkeado match', data);
          console.log('PARTIDO REVISADO CORRECTAMENTE, TODO OK', res);
        });
      }
    );

  }

}
