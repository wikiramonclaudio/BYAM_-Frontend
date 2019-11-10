import { ForecastService } from './../../../services/forecast/forecast.service';
import { Forecast } from './../../../models/forecast.model';
import { MatchTypeRelationService } from './../../../services/matchTypeRelation/match-type-relation.service';
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
import { MatchTypeRelation } from 'src/app/models/matchtyperelation';
import { Bet } from 'src/app/models/bet.model';
import { BetService } from 'src/app/services/bet/bet.service';
import swal from 'sweetalert';

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
  matchTypeRelations: MatchTypeRelation[] = [];
  forecasts: Forecast[] = [];
  bet: Bet = new Bet('', '');
  myForecasts: any [] = [];
  forecastByUser: any [] = [];
  selectedUser: User = new User('','','','');
  constructor(
    private tableService: TableService,
    private route: ActivatedRoute,
    private subscribeToTableService: SubscriptionTableService,
    private userService: UserService,
    private matchService: MatchService,
    private matchTypeRelationService: MatchTypeRelationService,
    private forecastService: ForecastService,
    private betService: BetService
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

  addForecastTobet() {
    this.forecastService.createManyForecasts(this.forecasts).subscribe(
      res => {
        swal("Te has registrado en la mesa", " ", "success");
        this.getSubscriptors();
      }
    )
  }

  subscribeToTable() {
    if (this.getSelectedForecastCount() == this.matchTypeRelations.length) {
      this.subscribeToTableService.createSubscriptionTable(this.subscription).subscribe(
        res => {
          let newBet = new Bet(this.table._id, this.userService.user._id)
          this.betService.createBet(newBet).subscribe(
            res => {
              this.forecasts.forEach(element => {
                element.bet = res._id;
              });
              this.addForecastTobet();
            }
          )
        },
        err => {
          console.log(err);
        }
      )
    } else {
      alert('Es necesario rellenar todos los pronosticos de la mesa para unirte');
    }
  }

  getSubscriptors() {
    this.subscribeToTableService.getSubscriptionsByTable(this.table._id).subscribe(
      res => {
        this.tableSubscriptions = res.tableSubscriptions;
        var subsc: TableSubscription = new TableSubscription(this.table.owner, this.table._id);
        this.tableSubscriptions.unshift(subsc);
        this.totalAmount = Number(this.table.betamount) * this.tableSubscriptions.length;
        if (this.checkSubscription()) {
          this.getBetsByTable(this.userService.user,this.userService.user._id);
        } else {
          this.getFullMatchesByTable(this.table._id);
        }
      }
    )
  }

  getBetsByTable(user: User, userId: string){
    this.selectedUser = user;
    this.betService.getBetsByTable(this.table._id).subscribe(
      res => {
        let myBet = res.bet.find((el) => {
          return el.owner == userId
        }); 
        if(myBet)
          this.getMyBetData(myBet._id);
      }
    )
  }

  getMyBetData(betId: string) {
    this.forecastService.getBetForecasts(betId).subscribe(
      res => {                 
        this.myForecasts = res.forecast;
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

  getFullMatchesByTable(tableId: string) {
    this.matchTypeRelationService.getMatchTypeRelationsByTable(tableId).subscribe(
      (res: any) => {
        this.matchTypeRelations = res.matchTypeRelation;        
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

  saveMatchesByTable(tableId: string) {
    this.matchesByTable.forEach((el) => {
      el.table = tableId;
    });
    this.matchService.createManyMatches(this.matchesByTable).subscribe(
      res => {
        console.log('Se GUARDAN PARTIDOS DE ESTA TABLA', res);
      }
    )
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
    let newForecast = new Forecast(matchByTable.match._id, matchByTable.bettype._id, optionId, '');
    var exists = this.forecasts.filter((el) => {
      return matchByTable.match._id == el.match;
    }).length;
    if (exists == 0) {
      this.forecasts.push(newForecast);
    } else {
      let modifiedForecast = this.forecasts.find((el: any) => {
        return el.match == matchByTable.match._id;
      });
      modifiedForecast.choice = optionId;
    }
  }

  getSelectedForecastCount() {
    return this.forecasts.length;
  }

}
