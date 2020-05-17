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
@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {
  public tableForm: FormGroup;
  table: Table = new Table('10', '', '', false, false, '', '', 'Futbol');
  matches: any[] = [];
  matchesByTable: MatchByTable[] = [];
  selectedMatches: Match[] = [];
  betTypesLoaded = false;
  betTypes: any[] = [];
  betTypeValues = [];
  matchesWithBetType: any [] = [];
  disableCreateButton = true;
  submitted = false;
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
        }
      }
    );
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
      );
    } else {
      swal(this.translate.instant('table.fit_mandatory_fields_title'), this.translate.instant('table.fit_mandatory_fields_text'), 'warning');
    }
  }

  getMatches() {
    this.matchService.getMatches().subscribe(
      res => {
        this.matches = res.matches;
        this.getBetTypes();
      }
    );
  }

  // Visual toggle tiebreak matches
  toggleSelected(match) {
    match.selected = !match.selected;
  }

  // Save matches
  saveMatches() {
    this.selectedMatches = this.matches.filter((el) => {
      return el.selected == true;
    });
    this.selectedMatches.forEach((item: any) => {
      this.matchesByTable.push(
        new MatchByTable(item._id, this.table._id)
      );
    });
  }

  // get the selected matches
  getSelectedMatches() {
    return this.selectedMatches;
  }

  // Save matches by table
  saveMatchesTypeRelation(tableId: string) {
    this.matchesWithBetType.forEach((item) => {
      if (item.match == this.tiebreakMatch) {
        item.tiebreak = true;
      }
      item.table = tableId;
    });
    this.matchTypeRelService.createManyMatchTypeRelations(this.matchesWithBetType).subscribe(
      res => {
        this.router.navigate(['/table', this.table._id]);
      }
    );
  }

  // Add match to selected matches (To save them on this table)
  saveMatch(event: any, betType: any, tableId: string) {
    const match = event.items[0];
    const matches = event.items;

    matches.forEach(match => {
      match.tiebreak = false;
      const exists = this.matchesWithBetType.find((item) => {
        return item.match == match._id;
      });
      const newMatchTypeRelation = {
        match: match._id,
        bettype: this.betTypes[0]._id
      };
      if (!exists) {
        this.matchesWithBetType.push(newMatchTypeRelation);
      } else {
        swal('Partido añadido', 'Este partido ya está añadido', 'warning');
      }
    });
    this.tiebreakMatch = match._id;
  }

  removeSelectedMatchTypeRelation(event) {
    // quitar de los this.matchesWithBetType
    event.items.forEach((item) => {
      const exists = this.matchesWithBetType.find((item) => {
        return item.match == item._id;
      });
      this.matchesWithBetType = this.matchesWithBetType.filter((matchWithBet) => {
        return !exists;
      });
    });

  }

  // check selected tiebrekmatch (Draws)
  setTieBreak(event) {
    const match = event.items[0];
    this.matches.forEach((ma) => {
      ma.tiebreak = false;
    });
    this.tiebreakMatch = match._id;
    match.tiebreak = !match.tiebreak;
  }

  // check selected tiebrekmatch
  checkTieBreakSelection() {
    if (this.tiebreakMatch) {
      return true;
    } else {
      return false;
    }
  }

  // Deselect selected match
  deselectMatch(match: any, matches: any []) {
    match.selected = false;
  }

}
