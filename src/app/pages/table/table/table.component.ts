import { SubscriptionTableService } from './../../../services/tablesubscription/table-subscription.service';
import { ForecastService } from './../../../services/forecast/forecast.service';
import { MatchTypeRelationService } from './../../../services/matchTypeRelation/match-type-relation.service';
import { MatchService } from './../../../services/match/match.service';
import { UserService } from 'src/app/services/service.index';
import { BetService } from 'src/app/services/bet/bet.service';
import { Forecast } from './../../../models/forecast.model';
import { MatchByTable } from 'src/app/models/matchbytable.model';
import { TableSubscription } from './../../../models/tablesubscription.model';
import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/models/table.model';
import { User } from 'src/app/models/user.model';
import { Match } from 'src/app/models/match.model';
import { MatchTypeRelation } from 'src/app/models/matchtyperelation';
import { Bet } from 'src/app/models/bet.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  table: any = new Table('', '', '', false, false);
  owner: User = new User('', '', '');
  tableSubscriptions: any[] = [];
  totalAmount: number;
  subscription: any = new TableSubscription('', '');
  matchesByTable: MatchByTable[] = [];
  matches: Match[] = [];
  selectedMatches: Match[];
  matchTypeRelations: MatchTypeRelation[] = [];
  forecasts: Forecast[] = [];
  bet: Bet = new Bet('', '');
  myForecasts: any[] = [];
  forecastByUser: any[] = [];
  selectedUser: User = new User('', '', '', '');
  deadlineDate: any = '';
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
        this.subscription.table = res.table;
        this.subscription.player = this.userService.user;
        this.getSubscriptors();
        this.selectedUser = this.userService.user;
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
      this.subscribeToTableService.createSubscriptionTable(this.subscription, this.table.betamount).subscribe(
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
          swal('No tienes saldo suficiente!', 'Necesitas ' + (this.table.betamount - this.userService.user.money) + ' euros para jugar' , 'error');
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
        this.totalAmount = Number(this.table.betamount) * this.tableSubscriptions.length;
        if (this.checkSubscription()) {
          this.getBetsByTable(this.userService.user, this.userService.user._id);
        } else {
          if (!this.table.closed)
            this.getFullMatchesByTable(this.table._id);
          else
            this.getBetsByTable(this.tableSubscriptions[0].player, this.tableSubscriptions[0].player._id);
        }
      }
    )
  }

  getBetsByTable(user: User, userId: string) {
    this.selectedUser = user;
    this.betService.getBetsByTable(this.table._id).subscribe(
      res => {
        let myBet = res.bet.find((el) => {
          return el.owner == userId
        });
        if (myBet)
          this.getMyBetData(myBet._id);
      }
    )
  }

  getMyBetData(betId: string) {
    this.forecastService.getBetForecasts(betId).subscribe(
      res => {
        this.myForecasts = res.forecast;
        this.countDown(this.myForecasts);
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
        var finished = res.matchTypeRelation.filter((match) => {
          return match.winnerchoice != null && match.winnerchoice != undefined;
        });
        this.countDown();
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

  countDown(array?: any) {

    var arrayFechas: any[] = [];
    if (array) {
      array.forEach((element: any) => {
        arrayFechas.push(element.match.when)
      });
    }

    this.matchTypeRelations.forEach((element: any) => {
      arrayFechas.push(element.match.when)
    });

    var earliest = arrayFechas.reduce(function (pre, cur) {
      return Date.parse(pre) > Date.parse(cur) ? cur : pre;
    });

    // var deadline = new Date("Jan 5, 2018 15:37:25").getTime();    
    if (this.table.closed == false) {
      var x = setInterval(() => {
        var deadline: any = new Date(earliest).getTime();
        var now = new Date().getTime();
        var t = deadline - now;
        var days: any = Math.floor(t / (1000 * 60 * 60 * 24));
        var hours: any = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes: any = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds: any = Math.floor((t % (1000 * 60)) / 1000);
        // document.getElementById("demo").innerHTML = days + "d "
        //   + hours + "h " + minutes + "m " + seconds + "s ";
        if (!document.getElementById("day")) {
          clearInterval(x);
          return;
        }
        document.getElementById("day").innerHTML = days;
        document.getElementById("hour").innerHTML = hours;
        document.getElementById("minute").innerHTML = minutes;
        document.getElementById("second").innerHTML = seconds;
        this.deadlineDate = 'La mesa cerrará en ' + days + ' días, ' + hours + 'hours, ' + minutes + ' minutos';
        if (t < 0) {
          clearInterval(x);
          this.table.closed = true;
          this.deadlineDate = 'Mesa cerrada';
          this.tableService.updateTable(this.table).subscribe(
            res => {
              this.ngOnInit();
            }
          )
        }
      }, 1000);
    }
  }

  editTableName(){
    console.log('owner', this.table.owner);
    console.log('userservice', this.userService.user._id);
    if(this.table.owner._id == this.userService.user._id){
      // swal("Importante", "Debes aceptar las condiciones!", "warning");
      var el: any = {content: "input"};
      swal("Cambiar nombre de la mesa:", el ).then((value) => {      
        this.table.name = value;  
        this.tableService.updateTable(this.table).subscribe(
          res=>{
            // this.ngOnInit();
          }
        )
      });;
    }
  }
}
