import { UserService } from './../../../services/user/user.service';
import { TableService } from 'src/app/services/table/table.service';
import { SubscriptionTableService } from 'src/app/services/tablesubscription/table-subscription.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  tables: any[] = [];
  constructor(
    private tableService: TableService,
    private userService: UserService,
    private tableSubscriptionService: SubscriptionTableService
  ) { }

  ngOnInit() {
    this.tableService.getTables({ _id : this.userService.user._id}).subscribe(
      res=>{
        this.tables = res.tables;
      }
    );
  }

  getMyTables(){
    this.tableSubscriptionService.getSubscriptionsByUser(this.userService.user._id).subscribe(
      res=>{                
        this.tables = [];
        res.tableSubscriptions.forEach(element => {
          this.tables.push(element.table);
        });
      }
    );
  }

}
