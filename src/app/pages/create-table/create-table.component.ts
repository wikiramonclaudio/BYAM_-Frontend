import { BetType } from './../../models/bettype.model';
import { MatchTypeRelationService } from './../../services/matchTypeRelation/match-type-relation.service';
import { BetTypeService } from './../../services/bettype/bet-type.service';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Table } from 'src/app/models/table.model';
import { UserService } from 'src/app/services/service.index';
import { MatchService } from 'src/app/services/match/match.service';
import { TableService } from './../../services/table/table.service';
import { Match } from 'src/app/models/match.model';
import { MatchByTable } from 'src/app/models/matchbytable.model';
import { SubscriptionTableService } from 'src/app/services/tablesubscription/table-subscription.service';
import swal from 'sweetalert';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/translation.service';
import {PickListModule} from 'primeng/picklist';
@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css'] 
})
export class CreateTableComponent implements OnInit {
  public tableForm: FormGroup;
  table: Table = new Table('10', '', '', false, false, '','','Futbol');
  matches: any[] = [];
  matchesByTable: MatchByTable[] = [];
  selectedMatches: Match[] = [];
  betTypesLoaded: boolean = false;
  betTypes: any[] = [];
  betTypeValues = [];
  matchesWithBetType: any [] = [];
  disableCreateButton: boolean = true;
  submitted: boolean = false;
  tiebreakMatch: any;
  translate: TranslateService;
  constructor(
    private router: Router,
    private tableService: TableService,
    private userService: UserService,
    private matchService: MatchService,
    private betTypeService: BetTypeService,
    private matchTypeRelService: MatchTypeRelationService,
    public tableSubscriptionService: SubscriptionTableService,
    public translationService: TranslationService
  ) { }

  ngOnInit() {
    this.translate = this.translationService.getTranslateService();
    this.getMatches();
  }

  getBetTypes() {
    this.betTypeService.getBetTypes().subscribe(
      res => {        
        this.betTypes = res.betTypes;
        for (let index = 0; index < this.matches.length; index++) {
          // const element = this.matches[index];
          this.betTypeValues[index] = this.betTypes[0];             
        };
        console.log('this.betTypeValues',this.betTypeValues);
      }
    )
    this.betTypesLoaded = true;
  }

  createTable() {    
    if (this.getSelectedMatches().length > 2 && this.checkTieBreakSelection()) {
      this.table.owner = this.userService.user._id;
      this.table.totalamount = this.table.betamount;
      this.table.userslimit = '10';
      this.table.type = 'Fútbol';
      this.tableService.createTable(this.table).subscribe(
        res => {
          this.table = res;
          this.saveMatchesTypeRelation(res._id);
        }
      )
    } else {
      swal('Rellena todos los campos', 'Asegúrate que has añadido al menos 3 partidos y que has marcado el partido de desempate en los partidos añadidoas', 'warning');
    }
  }

  getMatches() {
    this.matchService.getMatches().subscribe(
      res => {
        this.matches = res.matches;
        this.getBetTypes();
      }
    )
  }

  //Visual toggle tiebreak matches 
  toggleSelected(match) {
    match.selected = !match.selected;
  }

  //Save matches 
  saveMatches() {
    this.selectedMatches = this.matches.filter((el) => {
      return el.selected == true;
    });
    this.selectedMatches.forEach((item: any) => {
      this.matchesByTable.push(
        new MatchByTable(item._id, this.table._id)
      )
    });
  }

  //get the selected matches 
  getSelectedMatches() {
    // var pepino = this.matches.filter((el) => {
    //   return el.selected == true;
    // });
    // return pepino;
    return this.selectedMatches;
  }

  //Save matches by table
  saveMatchesTypeRelation(tableId: string) {    
    this.matchesWithBetType.forEach((item)=>{
      if(item.match == this.tiebreakMatch)
        item.tiebreak = true;
      item.table = tableId;      
    });
    console.log('matches with bet type',this.matchesWithBetType);
    this.matchTypeRelService.createManyMatchTypeRelations(this.matchesWithBetType).subscribe(
      res => {        
        console.log('Guardados OK los match type relations');
        this.router.navigate(['/table', this.table._id]);
      }
    )
  }

  //Add match to selected matches (To save them on this table)
  saveMatch(event: any, betType: any, tableId: string) {   
    let match = event.items[0];
    let matches = event.items;    
    // match.selected = true;
    
    matches.forEach(match => {
      var exists = this.matchesWithBetType.find((item)=>{
        return item.match == match._id;
      });
      let newMatchTypeRelation = { 
        match: match._id, 
        bettype: this.betTypes[0]._id      
      };
      if(!exists){
        this.matchesWithBetType.push(newMatchTypeRelation);
      }else{      
        swal('Partido añadido', 'Este partido ya está añadido', 'warning');
      }
    });    
  }

  removeSelectedMatchTypeRelation(event){
    // quitar de los this.matchesWithBetType
    event.items.forEach((item)=>{      
      var exists = this.matchesWithBetType.find((item)=>{
        return item.match == item._id;
      });
      this.matchesWithBetType = this.matchesWithBetType.filter((matchWithBet)=>{
        return !exists;
      });
    });
   
  }

  //check selected tiebrekmatch (Draws)
  setTieBreak(event){    
    let match = event.items[0];
    this.matches.forEach((ma)=>{
      ma.tiebreak = false;
    });
    this.tiebreakMatch = match._id;
    match.tiebreak = !match.tiebreak;
  }

  //check selected tiebrekmatch
  checkTieBreakSelection(){
    // let choices = this.matches.filter((el)=>{
    //   return el.tiebreak == true;
    // });
    // return choices.length == 1;
    if(this.tiebreakMatch)
      return true;
    else
      return false;
  }

  //Deselect selected match 
  deselectMatch(match: any, matches: any []){
    match.selected = false;    
  }

  // saveMatchesByTable(tableId: string) {
  //   this.matchesByTable.forEach((el) => {
  //     el.table = tableId;
  //   });
  //   this.matchService.createManyMatches(this.matchesByTable).subscribe(
  //     res => {
  //       console.log('EN TEORIA SE GUARDAN PARTIDOS DE ESTA TABLA', res);
  //       this.router.navigate(['/table', this.table._id]);
  //     }
  //   )
  // }

}