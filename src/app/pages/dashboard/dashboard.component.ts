import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { Table } from 'src/app/models/table.model';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tables: Table[];
  fromPage = 0;
  topWinners: any [];
  lastTables;
  public translate: TranslateService;
  constructor(
    private tableService: TableService,
    public userService: UserService,
    public translationService: TranslationService
  ) {
    this.lastTables = [];
    this.getTopWinners();
    this.translate = this.translationService.getTranslateService();
  }

  ngOnInit() {
    this.getLatestTables();
  }

  getTables() {
    // this.tableService.getTables({}, this.fromPage).subscribe(res => {
    //   this.tables = res.tables;
    // });
  }

  // get top 6 winner users of BYAM
  getTopWinners () {
    this.userService.getTopWinners().subscribe(
      (res: any) => {
        this.topWinners = res.users;
      }
    );
  }

  // get last 3 tables
  getLatestTables () {
    this.tableService.getLastTables().subscribe(
      (result: any) => {
        if (result.tables) {
          this.lastTables = result.tables;
        }
      }
    );
  }
}
