import { MatchByTable } from 'src/app/models/matchbytable.model';
import { MatchService } from './../../../services/match/match.service';
import { TableSubscription } from './../../../models/tablesubscription.model';
import { SubscriptionTableService } from './../../../services/tablesubscription/table-subscription.service';
import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/models/table.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import { Match } from 'src/app/models/match.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  table: Table = new Table('', '', '', false, false);
  owner: User = new User('', '', '');
  tableSubscriptions: any[] = [];
  totalAmount: number;
  subscription: TableSubscription = new TableSubscription('', '');
  matchesByTable: MatchByTable[] = [];
  matches: Match[] = [];
  selectedMatches: Match[];
  constructor(
    private tableService: TableService,
    private route: ActivatedRoute,
    private subscribeToTableService: SubscriptionTableService,
    private userService: UserService,
    private matchService: MatchService
  ) { }

  ngOnInit() {
    let tableId = this.route.snapshot.paramMap.get('id');
    this.tableService.getTable(tableId).subscribe(
      res => {
        this.table = res.table;
        this.owner = res.table.owner;
        this.subscription.table = res.table._id;
        this.subscription.player = this.userService.user._id;
        this.getSubscriptors();
      }
    );
  }

  subscribeToTable() {
    this.subscribeToTableService.createSubscriptionTable(this.subscription).subscribe(
      res => {
        this.getSubscriptors();
      },
      err => {
        console.log(err);
      }
    )
  }

  getSubscriptors() {
    this.subscribeToTableService.getSubscriptionsByTable(this.table._id).subscribe(
      res => {
        this.tableSubscriptions = res.tableSubscriptions;
        var subsc: TableSubscription = new TableSubscription(this.table.owner, this.table._id);
        this.tableSubscriptions.unshift(subsc);
        this.totalAmount = Number(this.table.betamount) * this.tableSubscriptions.length;
        this.getMatchesByTable();
      }
    )
  }

  checkSubscription() {
    var subscribed = this.tableSubscriptions.find((sub) => {
      return sub.player._id == this.userService.user._id;
    })
    if (subscribed && subscribed != null)
      return true;
    else
      return false;
  }

  getMatchesByTable() {
    this.matchService.getMatchesByTable(this.table._id).subscribe(
      (res: any) => {
        this.matchesByTable = res.matchesByTable;
      }
    )
  }

  getMatches() {
    this.matchService.getMatches().subscribe(
      res => {
        this.matches = res.matches;
      }
    )
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
    this.saveMatchesByTable(this.table._id)
  }

  toggleSelected(match) {
    match.selected = !match.selected;
  }

  saveMatchesByTable(tableId: string){   
    this.matchesByTable.forEach((el)=>{
       el.table = tableId;
    }); 
    this.matchService.createManyMatches( this.matchesByTable, ).subscribe(
      res=>{
        console.log('Se GUARDAN PARTIDOS DE ESTA TABLA', res);
      }
    )
  }


}
