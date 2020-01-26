import { Table } from './../../../models/table.model';
import { UserService } from './../../../services/user/user.service';
import { TableService } from 'src/app/services/table/table.service';
import { SubscriptionTableService } from 'src/app/services/tablesubscription/table-subscription.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  tables: Table[] = [];
  translate: TranslateService;
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

  getTables() {
    this.tableService.getTables({ published: false }).subscribe(
      res => {
        this.tables = res.tables;
      }
    );
  }

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

}
