import { TranslationService } from './../../../services/translation/translation.service';
import { Message } from './../../../models/message.model';
import { MessageService } from './../../../services/message/message.service';
import { SubscriptionTableService } from './../../../services/tablesubscription/table-subscription.service';
import { ForecastService } from './../../../services/forecast/forecast.service';
import { MatchTypeRelationService } from './../../../services/matchTypeRelation/match-type-relation.service';
import { MatchService } from './../../../services/match/match.service';
import { UserService } from 'src/app/services/service.index';
import { BetService } from 'src/app/services/bet/bet.service';
import { Forecast } from './../../../models/forecast.model';
import { MatchByTable } from 'src/app/models/matchbytable.model';
import { TableSubscription } from './../../../models/tablesubscription.model';
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/models/table.model';
import { User } from 'src/app/models/user.model';
import { Match } from 'src/app/models/match.model';
import { MatchTypeRelation } from 'src/app/models/matchtyperelation';
import { Bet } from 'src/app/models/bet.model';
import swal from 'sweetalert';
import { WebsocketService } from 'src/app/services/websocket.service';
import { TranslateService } from '@ngx-translate/core';
import {DropdownModule} from 'primeng/dropdown';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
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
  allMatchesFinished: boolean;
  goalsTotal: number;
  goalsLocalTeam: number;
  goalsAwayTeam: number;
  tiebreakMatch: any;
  joinedUser: boolean;
  mensajes: any[] = [];
  texto: string = '';
  elemento: HTMLElement;
  textField: HTMLElement;
  translate: TranslateService;
  constructor(
    private tableService: TableService,
    private route: ActivatedRoute,
    private subscribeToTableService: SubscriptionTableService,
    private userService: UserService,
    private matchService: MatchService,
    private matchTypeRelationService: MatchTypeRelationService,
    private forecastService: ForecastService,
    private betService: BetService,
    public websocketService: WebsocketService,
    public messageService: MessageService,
    public translationService: TranslationService
    // private translate: TranslateService
  ) { }

  ngOnInit() {
    let tableId = this.route.snapshot.paramMap.get('id');
    // this.translate.setDefaultLang('en');
    this.translate = this.translationService.getTranslateService();
    this.tableService.getTable(tableId).subscribe(
      res => {
        this.table = res.table;
        this.owner = res.table.owner;
        this.subscription.table = res.table;
        this.subscription.player = this.userService.user;
        this.getSubscriptors();
        this.selectedUser = this.userService.user;
        this.elemento = document.getElementById('chat-mensajes');
        this.textField = document.getElementById('textField');
      }
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('SE ABANDONA EL SOCKET');
    this.websocketService.emit('leaveTable', {tableId: this.table._id, user: this.userService.user});
  }

  ngAfterContentInit(){
    // console.log('ngAfterContentInit');
    // if (this.checkSubscription()) 
    //   this.subscribeToSocket();
  }

  addForecastTobet() {
    this.forecastService.createManyForecasts(this.forecasts).subscribe(
      res => {
        swal("Te has registrado en la mesa.", " Te deseamos mucha suerte! ", "success");
        this.ngOnInit();
      }
    )
  }

  subscribeToTable() {
    if ((this.getSelectedForecastCount() == this.matchTypeRelations.length) && this.goalsTotal >= 0) {
      // let totalgoals = this.goalsLocalTeam + this.goalsAwayTeam;
      this.subscribeToTableService.createSubscriptionTable(this.subscription, this.table.betamount).subscribe(
        res => {
          let newBet = new Bet(this.table._id, this.userService.user._id, null, null, this.goalsTotal, this.tiebreakMatch.match._id);
          this.betService.createBet(newBet).subscribe(
            res => {
              this.forecasts.forEach(element => {
                element.bet = res._id;
                element.table = this.table._id;
              });
              this.addForecastTobet();
              swal("Te has registrado en la mesa", " ", "success");
            }
          )
        },
        err => {
          swal('No tienes saldo suficiente!', 'Necesitas ' + (this.table.betamount - this.userService.user.money) + ' euros para jugar', 'error');
          console.log(err);
        }
      )
    } else {
      swal('Rellena todos los pronósticos', 'Rellena todos los pronósticos incliyendo el número total de goles para unirte', 'error');
    }
  }

  subscribeToSocket() {
    if (!this.joinedUser) {
      this.joinedUser = true;
      this.websocketService.listen('newPlayerInTable', {}).subscribe(
        (res: any) => {
          console.log('NEW PLAYER IN TABLE', res);
          // console.log('params', params);
          if(this.userService.user._id != res.user._id){
            swal(res.user.name + " se ha unido a la mesa ", {                    
              timer: 2500,
            });
          }
          // this.ngOnInit();
        }
      );
      this.websocketService.listen('newTableMessage', {}).subscribe(
        (res: any) => {
          console.log(res);
          let newMsg = { owner: res.user, table: this.table._id, content: res.text};                      
          this.mensajes.push(newMsg);
          setTimeout(() => {
            // scroll siempre abajo
            this.elemento.scrollTop = this.elemento.scrollHeight;
          }, 50);
          // console.log('params', params);
        }
      );
      this.websocketService.listen('chat:typing', function(data){
        console.log('someone is typing', data);
        var actions = document.getElementById('actions-text');
        actions.innerHTML = `<p>
            <em>${data}</em> is typing a message...
        </p>`
    });
      this.websocketService.emit('joinInTable', { user: this.userService.user, tableId: this.table._id });
    }
  }

  getSubscriptors() {
    this.subscribeToTableService.getSubscriptionsByTable(this.table._id).subscribe(
      res => {
        this.tableSubscriptions = res.tableSubscriptions;
        this.totalAmount = Number(this.table.betamount) * this.tableSubscriptions.length;
        if (this.checkSubscription()) {
          this.subscribeToSocket();
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
        this.checkAllFinished(this.myForecasts)
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
        this.tiebreakMatch = this.matchTypeRelations.find((el) => {
          return el.tiebreak == true;
        });
        var finished = res.matchTypeRelation.filter((match) => {
          return match.winnerchoice != null && match.winnerchoice != undefined;
        });
        this.checkAllFinished(this.matchTypeRelations);
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

    // var latest = arrayFechas.reduce((m,v,i) => (v.ModDate > m.ModDate) && i ? v : m).ModDate;    

    if (this.table.closed == false) {
      var x = setInterval(() => {
        var deadline: any = new Date(earliest).getTime();
        // console.log( new Date().getTimezoneOffset());
        // console.log(deadline + new Date().getTimezoneOffset());
        var now = new Date().getTime();
        // console.log('now', now);
        // console.log(now + new Date().getTimezoneOffset());
        var t = deadline - now;
        var days: any = Math.floor(t / (1000 * 60 * 60 * 24));
        var hours: any = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // hours -= 1;
        var minutes: any = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds: any = Math.floor((t % (1000 * 60)) / 1000);
        if (!document.getElementById("day")) {
          clearInterval(x);
          return;
        }
        document.getElementById("day").innerHTML = days;
        document.getElementById("hour").innerHTML = hours;
        document.getElementById("minute").innerHTML = minutes;
        document.getElementById("second").innerHTML = seconds;
        this.deadlineDate = 'La mesa cerrará en ' + days + ' días, ' + hours + 'hours, ' + minutes + ' minutos';
        if (t < 0 || minutes < 0 || hours < 0) {
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

  editTableName() {
    if (this.table.owner._id == this.userService.user._id) {
      var el: any = { content: "input", inputValue: this.table.name };
      swal("Cambiar nombre de la mesa:", el).then((value) => {
        if (value.length > 2) {
          this.table.name = value;
          this.tableService.updateTable(this.table).subscribe(
            res => {
              // this.ngOnInit();
            }
          )
        }
      });;
    }
  }

  checkWinner() {
    this.forecastService.getForecastsByTable(this.table._id).subscribe(
      (res: any) => {
        // let winnerchoice = res.forecast[0].winnerchoice;        
        let users: any[] = [];
        res.forecast.forEach(element => {
          let contains = users.find((el) => {
            return el.userId == element.bet.owner;
          });
          if (!contains || contains == null) {
            if (element.bet.tiebreakmatch == element.match._id) {
              users.push({ userId: element.bet.owner, successes: 0, goals: element.bet.goals, goalsResult: element.match.goals });
            }
          }
        });

        let numAciertos: any = [];
        users.forEach((user: any) => {
          res.forecast.forEach(element => {
            if (element.bet.owner == user.userId && element.winnerchoice == element.choice._id) {
              user.successes = user.successes + 1;
              numAciertos.push(user.successes);
            }
          });
        });

        var valorMasGrande = Math.max.apply(null, numAciertos);
        let winnerPlayer: any = {};
        let winners: any = [];
        let numbers: any = [];
        users.forEach(element => {
          if (element.successes >= valorMasGrande) {
            valorMasGrande = element.successes;
            winnerPlayer = element;
            element.average = element.goalsResult / element.goals;
            winners.push(element);
          }
        });
        if (winners.length == 1 && (!this.table.winner || this.table.winner == undefined)) {
          winnerPlayer = winners[0];
          this.table.winner = winnerPlayer.userId;
          this.table.owner = this.table.owner._id;
          this.table.closed = true;
          this.tableService.setTableWinner(this.table).subscribe(
            (res: any) => {
              if (winnerPlayer.userId == this.userService.user._id)
                this.userService.user.money = res.user.money;
              this.ngOnInit();
            }
          )
        } else {
          let diferencia = 50;
          var finalWinners = [];
          var finalWinner: any = {};
          let maxValue = 0;
          var numero = winners[0].goalsResult;
          winners.forEach(player => {
            if (player.goalsResult == player.goals)
              finalWinners.push(player);
            else {
              if (Math.abs(player.goals - numero) < diferencia) {
                finalWinner = player;
                diferencia = Math.abs(player.goals - numero);
              }
            }
          });
          if (finalWinners.length > 0) {
            if (finalWinners.length == 1 && (!this.table.winner || this.table.winner == undefined)) {
              finalWinner = finalWinners[0];
              this.table.winner = finalWinner.userId;
              this.table.owner = this.table.owner._id;
              this.table.closed = true;
              this.tableService.setTableWinner(this.table).subscribe(
                (res: any) => {
                  if (winnerPlayer.userId == this.userService.user._id)
                    this.userService.user.money = res.user.money;
                  this.ngOnInit();
                }
              )
            } else {
              console.log('Hay varios ganadores, hay que repartir...Los ganadores son', finalWinners);
              // this.tableService.setTableWinner(this.table).subscribe(
              //   (res: any) => {
              //     if (winnerPlayer.userId == this.userService.user._id)
              //       this.userService.user.money = res.user.money;
              //     this.ngOnInit();
              //   }
              // )
            }
          } else {
            if ((!this.table.winner || this.table.winner == undefined)) {
              this.table.winner = finalWinner.userId;
              this.table.owner = this.table.owner._id;
              this.table.closed = true;
              this.tableService.setTableWinner(this.table).subscribe(
                (res: any) => {
                  if (winnerPlayer.userId == this.userService.user._id)
                    this.userService.user.money = res.user.money;
                  this.ngOnInit();
                }
              )
            }
          }
        }

      }
    )
  }

  checkAllFinished(list: any) {
    this.allMatchesFinished = false;
    let variolo = list.filter((el) => {
      return el.match.finished == true;
    });

    this.allMatchesFinished = (variolo.length == list.length);
    if (this.allMatchesFinished == true && (this.table.winner == undefined || !this.table.winner)) {
      this.checkWinner();
    }
  }

  enviar() {
    if (this.texto.trim().length == 0)
      return;
    this.websocketService.emit('RoomMessage', { user: this.userService.user, text: this.texto, tableId: this.table._id });
    let newMsg = new Message(this.userService.user._id, this.table._id, this.texto);
    this.messageService.createMessage(newMsg).subscribe(
      res=>{
        console.log('Mensajolo guardado', res);
      }
    )   
    this.texto = '';
    this.textField.focus();
  }

  // @HostListener('window:focus', ['$event'])
  // onFocus(event: any): void {      
  //     console.log('FOCUSSSSS');
  // }

  // @HostListener('window:blur', ['$event'])
  // onBlur(event: any): void {      
  //     console.log('ON BLURRR DEJAR EL FOCUS');
      
  // }

  activateInputField(){
    setTimeout(() => {
      this.textField.focus();
      this.textField.addEventListener('keypress', (e)=>{
        this.websocketService.emit('chat:typing', this.userService.user.name);
      });
    }, 500);
    this.messageService.getMessagesByTable(this.table._id).subscribe(
      (res:any)=>{
        this.mensajes = res.messages;
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }
    )    
  }
}
