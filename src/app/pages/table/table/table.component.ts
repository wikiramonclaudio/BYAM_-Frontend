// import { Message } from './../../../models/message.model';
import { TranslationService } from './../../../services/translation/translation.service';
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
import { Bet } from 'src/app/models/bet.model';
import swal from 'sweetalert';
import { WebsocketService } from 'src/app/services/websocket.service';
import { TranslateService } from '@ngx-translate/core';
import { fadeAnimation } from 'src/app/services/common/animations';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    fadeAnimation
  ]
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
  matchTypeRelations: any[] = [];
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
  texto = '';
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
  ) { }

  ngOnDestroy(): void {

  }

  ngOnInit() {
    const tableId = this.route.snapshot.paramMap.get('id');
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

  addForecastTobet() {
    this.forecastService.createManyForecasts(this.forecasts).subscribe(
      res => {
        // swal("Te has registrado en la mesa.", " Te deseamos mucha suerte! ", "success");
        this.ngOnInit();
      }
    );
  }

  subscribeToTable() {
    if ((this.getSelectedForecastCount() == this.matchTypeRelations.length) && this.goalsTotal >= 0) {
      this.subscribeToTableService.createSubscriptionTable(this.subscription, this.table.betamount).subscribe(
        res => {
          const newBet = new Bet(this.table._id, this.userService.user._id, null, null, this.goalsTotal, this.tiebreakMatch.match._id);
          this.betService.createBet(newBet).subscribe(
            res => {
              this.forecasts.forEach(element => {
                element.bet = res._id;
                element.table = this.table._id;
              });
              this.addForecastTobet();
              swal('Te has registrado en la mesa', { icon: 'success', timer: 1000} );
            }
          );
        },
        err => {
          swal('No tienes saldo suficiente!', 'Necesitas ' + (this.table.betamount - this.userService.user.money) + ' euros para jugar', 'error');
          console.log(err);
        }
      );
    } else {
      swal('Rellena todos los pronósticos', 'Rellena todos los pronósticos, incluyendo el campo de desempate (Nº Goles/Sets)', 'error');
    }
  }

  subscribeToSocket() {
    if (!this.joinedUser) {
      this.joinedUser = true;
      this.websocketService.listen('newPlayerInTable', {}).subscribe(
        (res: any) => {
          console.log('NEW PLAYER IN TABLE', res);
          // console.log('params', params);
          if (this.userService.user._id != res.user._id) {
            swal(res.user.name + ' se ha unido a la mesa ', {
              timer: 2500,
            });
          }
          // this.ngOnInit();
        }
      );
      this.websocketService.listen('newTableMessage', {}).subscribe(
        (res: any) => {
          console.log(res);
          const newMsg = { owner: res.user, table: this.table._id, content: res.text };
          this.mensajes.push(newMsg);
          setTimeout(() => {
            // scroll siempre abajo
            this.elemento.scrollTop = this.elemento.scrollHeight;
          }, 50);
          // console.log('params', params);
        }
      );
      //   this.websocketService.listen('chat:typing', function(data){
      //     console.log('someone is typing', data);
      //     var actions = document.getElementById('actions-text');
      //     actions.innerHTML = `<p>
      //         <em>${data}</em> is typing a message...
      //     </p>`
      // });
      this.websocketService.emit('joinInTable', { user: this.userService.user, tableId: this.table._id });
    }
  }

  getSubscriptors() {
    this.subscribeToTableService.getSubscriptionsByTable(this.table._id).subscribe(
      res => {
        this.tableSubscriptions = res.tableSubscriptions;
        this.totalAmount = Number(this.table.betamount) * this.tableSubscriptions.length;
        if (this.checkSubscription()) {
          // this.subscribeToSocket();
          this.getBetsByTable(this.userService.user, this.userService.user._id);
        } else {
          if (!this.table.closed) {
            this.getFullMatchesByTable(this.table._id);
          } else {
            this.getBetsByTable(this.tableSubscriptions[0].player, this.tableSubscriptions[0].player._id);
          }
        }
      }
    );
  }

  getBetsByTable(user: User, userId: string) {
    this.selectedUser = user;
    this.betService.getBetsByTable(this.table._id).subscribe(
      res => {
        const myBet = res.bet.find((el) => {
          return el.owner == userId;
        });
        if (myBet) {
          this.getMyBetData(myBet._id);
        }
      }
    );
  }

  getMyBetData(betId: string) {
    this.forecastService.getBetForecasts(betId).subscribe(
      res => {
        this.myForecasts = res.forecast;
        this.countDown(this.myForecasts);
        this.checkAllFinished(this.myForecasts);
      }
    );
  }

  checkSubscription() {
    const subscribed = this.tableSubscriptions.find((sub) => {
      return sub.player._id == this.userService.user._id;
    });
    if (subscribed && subscribed != null) {
      return true;
    } else {
      return false;
    }
  }

  getFullMatchesByTable(tableId: string) {
    this.matchTypeRelationService.getMatchTypeRelationsByTable(tableId).subscribe(
      (res: any) => {
        console.log('response table', res);
        this.matchTypeRelations = res.matchTypeRelation;
        this.tiebreakMatch = this.matchTypeRelations.find((el) => {
          return el.tiebreak == true;
        });
        const finished = res.matchTypeRelation.filter((match) => {
          return match.winnerchoice != null && match.winnerchoice != undefined;
        });
        this.checkAllFinished(this.matchTypeRelations);
        this.countDown();
      }
    );
  }

  saveMatches() {
    this.selectedMatches = this.matches.filter((el) => {
      return el.selected == true;
    });
    this.selectedMatches.forEach((item: any) => {
      this.matchesByTable.push(
        new MatchByTable(item._id, this.table._id)
      );
    });
    this.saveMatchesByTable(this.table._id);
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
    );
  }

  toggleOption(matchByTable, optionNumber, optionId: string) {
    if (!optionId) {
      swal(this.translate.instant('table.alert_selection_title'), this.translate.instant('table.alert_selection_text'), 'error');
    } else {
      const newForecast = new Forecast(matchByTable.match._id, matchByTable.bettype._id, optionId, '');
      const exists = this.forecasts.filter((el) => {
        return matchByTable.match._id == el.match;
      }).length;
      if (exists == 0) {
        this.forecasts.push(newForecast);
      } else {
        const modifiedForecast = this.forecasts.find((el: any) => {
          return el.match == matchByTable.match._id;
        });
        modifiedForecast.choice = optionId;
      }
    }
  }

  getSelectedForecastCount() {
    return this.forecasts.length;
  }

  countDown(array?: any) {

    const arrayFechas: any[] = [];
    if (array) {
      array.forEach((element: any) => {
        arrayFechas.push(element.match.when);
      });
    }

    this.matchTypeRelations.forEach((element: any) => {
      arrayFechas.push(element.match.when);
    });

    const earliest = arrayFechas.reduce(function (pre, cur) {
      return Date.parse(pre) > Date.parse(cur) ? cur : pre;
    });

    if (this.table.closed == false) {
      const x = setInterval(() => {
        const deadline: any = new Date(earliest).getTime();
        const now = new Date().getTime();
        const t = deadline - now;
        const days: any = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours: any = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes: any = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        const seconds: any = Math.floor((t % (1000 * 60)) / 1000);
        if (!document.getElementById('day')) {
          clearInterval(x);
          return;
        }
        document.getElementById('day').innerHTML = days;
        document.getElementById('hour').innerHTML = hours;
        document.getElementById('minute').innerHTML = minutes;
        document.getElementById('second').innerHTML = seconds;
        this.deadlineDate = 'La mesa cerrará en ' + days + ' días, ' + hours + 'hours, ' + minutes + ' minutos';
        if (t < 0 || minutes < 0 || hours < 0) {
          clearInterval(x);
          this.table.closed = true;
          this.deadlineDate = 'Mesa cerrada';
          this.tableService.updateTable(this.table).subscribe(
            res => {
              this.ngOnInit();
            }
          );
        }
      }, 1000);
    }
  }

  editTableName() {
    if (this.table.owner._id == this.userService.user._id) {
      const el: any = { content: 'input', inputValue: this.table.name };
      swal('Cambiar nombre de la mesa:', el).then((value) => {
        if (value.length > 2) {
          this.table.name = value;
          this.tableService.updateTable(this.table).subscribe(
            res => {
              // this.ngOnInit();
            }
          );
        }
      });
    }
  }

  checkWinner() {
    this.forecastService.getForecastsByTable(this.table._id).subscribe(
      (res: any) => {
        // let winnerchoice = res.forecast[0].winnerchoice;
        const users: any[] = [];
        res.forecast.forEach(element => {
          const contains = users.find((el) => {
            return el.userId == element.bet.owner;
          });
          if (!contains || contains == null) {
            if (element.bet.tiebreakmatch == element.match._id) {
              users.push({ userId: element.bet.owner, successes: 0, goals: element.bet.goals, goalsResult: element.match.goals });
            }
          }
        });

        const numAciertos: any = [];
        users.forEach((user: any) => {
          res.forecast.forEach(element => {
            if (element.bet.owner == user.userId && element.winnerchoice == element.choice._id) {
              user.successes = user.successes + 1;
              numAciertos.push(user.successes);
            }
          });
        });

        let valorMasGrande = Math.max.apply(null, numAciertos);
        let winnerPlayer: any = {};
        const winners: any = [];
        const numbers: any = [];
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
              if (winnerPlayer.userId == this.userService.user._id) {
                this.userService.user.money = res.user.money;
              }
              this.ngOnInit();
            }
          );
        } else {
          let diferencia = 50;
          const finalWinners = [];
          let finalWinner: any = {};
          const maxValue = 0;
          const numero = winners[0].goalsResult;
          winners.forEach(player => {
            if (player.goalsResult == player.goals) {
              finalWinners.push(player);
            } else {
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
                  if (winnerPlayer.userId == this.userService.user._id) {
                    this.userService.user.money = res.user.money;
                  }
                  this.ngOnInit();
                }
              );
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
                  if (winnerPlayer.userId == this.userService.user._id) {
                    this.userService.user.money = res.user.money;
                  }
                  this.ngOnInit();
                }
              );
            }
          }
        }

      }
    );
  }

  checkAllFinished(list: any) {
    this.allMatchesFinished = false;
    const variolo = list.filter((el) => {
      return el.match.finished == true;
    });

    this.allMatchesFinished = (variolo.length == list.length);
    if (this.allMatchesFinished == true && (this.table.winner == undefined || !this.table.winner)) {
      this.checkWinner();
    }
  }

  activateInputField() {
    this.messageService.getMessagesByTable(this.table._id).subscribe(
      (res: any) => {
        this.mensajes = res.messages;
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }
    );
  }


}
