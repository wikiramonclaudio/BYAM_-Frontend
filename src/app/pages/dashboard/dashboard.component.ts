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
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.getTables();
  }

  getTables(){
    this.tableService.getTables().subscribe(res=>{
      console.log(res);
      this.tables = res.tables;
    });
  }

}
