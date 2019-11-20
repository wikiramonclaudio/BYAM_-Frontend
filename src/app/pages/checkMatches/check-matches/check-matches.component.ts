import { ForecastService } from './../../../services/forecast/forecast.service';
import { MatchTypeRelation } from 'src/app/models/matchtyperelation';
import { MatchService } from './../../../services/match/match.service';
import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { MatchTypeRelationService } from 'src/app/services/matchTypeRelation/match-type-relation.service';
import { BetTypeOption } from 'src/app/models/bettypeoption';

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
    this.matchTypeRelationService.getMatchTypeRelations().subscribe(
      (res: any) => {        
        const uniqueArray = res.matchTypeRelation.filter((match, index) => {
          const _match = match.match._id;;
          return index === res.matchTypeRelation.findIndex(obj => {
            return obj.match._id === _match;
          });
        }); 
        this.matchTypeRelations = uniqueArray;
      });
  }

  toggleOption(matchByTable, optionNumber, optionId: string) {
    if (optionNumber == 1) {
      matchByTable.bettype.option1.selected = true;
      matchByTable.bettype.option2.selected = false;
      if (matchByTable.bettype.option3)
        matchByTable.bettype.option3.selected = false;
    }
    if (optionNumber == 2) {
      matchByTable.bettype.option2.selected = true;
      matchByTable.bettype.option1.selected = false;
      if (matchByTable.bettype.option3)
        matchByTable.bettype.option3.selected = false;
    }
    if (optionNumber == 3) {
      matchByTable.bettype.option3.selected = true;
      matchByTable.bettype.option2.selected = false;
      matchByTable.bettype.option1.selected = false;
    }

  }

  setForecastResult(matchByTable: any, matchId: string) {
    let selectedChoice: any ={};
    if (matchByTable.bettype.option2.selected)
      selectedChoice = matchByTable.bettype.option2;
    if (matchByTable.bettype.option1.selected)
      selectedChoice = matchByTable.bettype.option1;
    if (matchByTable.bettype.option3 && matchByTable.bettype.option3.selected)
      selectedChoice = matchByTable.bettype.option3;
      console.log('selectedChoice', selectedChoice);
    this.forecastService.checkForecastResult(selectedChoice, matchId).subscribe(
      res => {
        console.log('PARTIDO MARCADO COMO FINALIZADO CORRECTAMENTE, TODO OK', res);
      }
    )
  }

}
