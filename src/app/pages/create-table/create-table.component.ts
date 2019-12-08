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

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css'] 
})
export class CreateTableComponent implements OnInit {
  public tableForm: FormGroup;
  table: Table = new Table('10', '', '', false, true, '','','Futbol');
  matches: any[] = [];
  matchesByTable: MatchByTable[] = [];
  selectedMatches: Match[] = [];
  betTypesLoaded: boolean = false;
  betTypes: BetType[] = [];
  betTypeValues = [];
  matchesWithBetType: any [] = [];
  disableCreateButton: boolean = true;
  submitted: boolean = false;
  tiebreakMatch: any;
  constructor(
    private router: Router,
    private tableService: TableService,
    private userService: UserService,
    private matchService: MatchService,
    private betTypeService: BetTypeService,
    private matchTypeRelService: MatchTypeRelationService,
    public tableSubscriptionService: SubscriptionTableService
  ) { }

  ngOnInit() {
    this.getMatches();
  }

  getBetTypes() {
    this.betTypeService.getBetTypes().subscribe(
      res => {        
        this.betTypes = res.betTypes;
        for (let index = 0; index < this.matches.length; index++) {
          const element = this.matches[index];
          this.betTypeValues[index] = this.betTypes[0];             
        };
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
      swal('Rellena todos los campos', 'Asegúrate que has añadido al menos 3 partidos y que has marcado el check del partido de desempate', 'warning');
    }
  }

  getMatches() {
    this.matchService.getMatches().subscribe(
      res => {
        this.matches = res.matches;        
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
    var pepino = this.matches.filter((el) => {
      return el.selected == true;
    });
    return pepino;
  }

  //Save matches by table
  saveMatchesTypeRelation(tableId: string) {    
    this.matchesWithBetType.forEach((item)=>{
      if(item.match == this.tiebreakMatch)
        item.tiebreak = true;
      item.table = tableId;      
    });
    this.matchTypeRelService.createManyMatchTypeRelations(this.matchesWithBetType).subscribe(
      res => {        
        this.router.navigate(['/table', this.table._id]);
      }
    )
  }

  //Add match to selected matches (To save them on this table)
  saveMatch(match: any, betType: any, tableId: string) {    
    match.selected = true;
    
    var exists = this.matchesWithBetType.find((item)=>{
      return item.match == match._id;
    });
    let newMatchTypeRelation = { 
      match: match._id, 
      bettype: betType._id      
    };
    if(!exists){
      this.matchesWithBetType.push(newMatchTypeRelation);
    }else{      
      swal('Partido añadido', 'Este partido ya está añadido', 'warning');
    }
  }

  //check selected tiebrekmatch (Draws)
  setTieBreak(match){
    this.matches.forEach((ma)=>{
      ma.tiebreak = false;
    });
    this.tiebreakMatch = match._id;
    match.tiebreak = !match.tiebreak;
  }

  //check selected tiebrekmatch
  checkTieBreakSelection(){
    let choices = this.matches.filter((el)=>{
      return el.tiebreak == true;
    });
    return choices.length == 1;
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