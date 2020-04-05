import { Table } from './../../../models/table.model';
import { UserService } from './../../../services/user/user.service';
import { TableService } from 'src/app/services/table/table.service';
import { SubscriptionTableService } from 'src/app/services/tablesubscription/table-subscription.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/translation.service';
import {InputTextModule} from 'primeng/inputtext';
import { fadeAnimation } from 'src/app/services/common/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class TablesComponent implements OnInit {
  tables: Table[] = [];
  initTables: Table[] = [];
  translate: TranslateService;
  searchFilter = '';
  currentPage = 0;
  constructor(
    private tableService: TableService,
    private userService: UserService,
    private tableSubscriptionService: SubscriptionTableService,
    public translationService: TranslationService
  ) { }

  ngOnInit() {
    this.translate = this.translationService.getTranslateService();
    this.getTables();
  }

  // get all tables
  getTables() {
    this.tableService.getTables({ published: false }, this.currentPage).subscribe(
      res => {
        this.initTables = res.tables;
        this.tables = res.tables;
      }
    );
  }

  // get only my tables
  getMyTables() {
    this.tableSubscriptionService.getSubscriptionsByUser(this.userService.user._id).subscribe(
      res => {
        this.tables = [];
        res.tableSubscriptions.forEach(element => {
          this.tables.push(element.table);
        });
      }
    );
  }

  // filter tables by name
  filterTables() {
    if (this.searchFilter && this.searchFilter.length > 0) {
      this.tables = this.initTables.filter((table) => {
        return table.name.toLowerCase().indexOf(this.searchFilter.toLowerCase()) > -1;
      });
    } else {
      this.tables = this.initTables;
    }
  }
}
