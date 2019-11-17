import { UserService } from './../../services/user/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { Table } from 'src/app/models/table.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tables: Table[];
  constructor(
    private tableService: TableService,    
    private userService: UserService,
    private wsService: WebsocketService
  ) { }

  ngOnInit() {
    this.getTables();       
  }

  getTables(){
    this.tableService.getTables({}).subscribe(res=>{      
      this.tables = res.tables;     
    });
    
  }

}
