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

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {
  public tableForm: FormGroup;
  table: Table = new Table('', '', '', false, false, '');
  matches: Match [] = [];
  matchesByTable: MatchByTable[] = [];
  selectedMatches: Match [];
  constructor(
    private router: Router,
    private tableService: TableService,
    private userService: UserService,
    private matchService : MatchService,
    public tableSubscriptionService: SubscriptionTableService
  ) { }

  ngOnInit() {
  }

  createTable(){
    if(this.getSelectedMatches().length > 1){
      this.table.owner = this.userService.user._id;
      this.table.totalamount = this.table.betamount;
      this.tableService.createTable(this.table).subscribe(
        res=>{           
          this.table = res;
          this.saveMatchesByTable(res._id);
        }
      )
    }else{
      alert('Es obligatorio añadir al menos 2 partidos a la mesa. ')
    }
  }

  getMatches(){
    this.matchService.getMatches().subscribe(
      res=>{
        this.matches = res.matches;
        console.log('PARTIDOS DISPONIBLES',res)
      }
    )
  }

  toggleSelected(match){
    match.selected = !match.selected;    
  }

  saveMatches(){
    this.selectedMatches = this.matches.filter((el)=>{
      return el.selected == true;
    });    
    this.selectedMatches.forEach((item: any)=>{
      this.matchesByTable.push(
        new MatchByTable(item._id, this.table._id)
      )
    });
    console.log('PARTIDOS SELECCIONADOS',  this.matchesByTable);
  }

  getMatchesByTable(){
    // this.matchService.getMatchesByTable()
  }

  getSelectedMatches(){
    var pepino = this.matches.filter((el)=>{
      return el.selected == true;
    });
    return pepino;
  }

  saveMatchesByTable(tableId: string){   
    this.matchesByTable.forEach((el)=>{
       el.table = tableId;
    }); 
    this.matchService.createManyMatches( this.matchesByTable, ).subscribe(
      res=>{
        console.log('EN TEORIA SE GUARDAN PARTIDOS DE ESTA TABLA', res);
        this.router.navigate(['/table', this.table._id]);        
      }
    )
  }
}