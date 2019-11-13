import { BetType } from './../../models/bettype.model';
import { MatchTypeRelationService } from './../../services/matchTypeRelation/match-type-relation.service';
import { BetTypeService } from './../../services/bettype/bet-type.service';
import { Router } from '@angular/router';
import { SubscriptionTableService } from './../../services/tableSubscription/table-subscription.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Table } from 'src/app/models/table.model';
import { UserService } from 'src/app/services/service.index';
import { MatchService } from 'src/app/services/match/match.service';
import { TableService } from './../../services/table/table.service';
import { Match } from 'src/app/models/match.model';
import { MatchByTable } from 'src/app/models/matchbytable.model';
import { MatchTypeRelation } from 'src/app/models/matchtyperelation';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {
  public tableForm: FormGroup;
  table: Table = new Table('10', '', '20', false, true, '','','Futbol');
  matches: Match[] = [];
  matchesByTable: MatchByTable[] = [];
  selectedMatches: Match[] = [];
  betTypesLoaded: boolean = false;
  betTypes: BetType[] = [];
  betTypeValues = [];
  matchesWithBetType: any [] = [];
  disableCreateButton: boolean = true;
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
    if (this.getSelectedMatches().length > 1) {
      this.table.owner = this.userService.user._id;
      this.table.totalamount = this.table.betamount;
      this.tableService.createTable(this.table).subscribe(
        res => {
          this.table = res;
          this.saveMatchesTypeRelation(res._id);
        }
      )
    } else {
      alert('Es obligatorio añadir al menos 2 partidos a la mesa. ')
    }
  }

  getMatches() {
    this.matchService.getMatches().subscribe(
      res => {
        this.matches = res.matches;        
      }
    )
  }

  toggleSelected(match) {
    match.selected = !match.selected;
  }

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

  getSelectedMatches() {
    var pepino = this.matches.filter((el) => {
      return el.selected == true;
    });
    return pepino;
  }

  saveMatchesTypeRelation(tableId: string) {    
    this.matchesWithBetType.forEach((item)=>{
      item.table = tableId;
    });
    this.matchTypeRelService.createManyMatchTypeRelations(this.matchesWithBetType).subscribe(
      res => {
        console.log('Mesa creada correctamente', res);
        this.router.navigate(['/table', this.table._id]);
      }
    )
  }

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
      alert('Este partido ya está añadido');
    }
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