import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/models/table.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  table: Table = new Table('','','',false,false);
  owner: User = new User('', '','');
  constructor(
    private tableService: TableService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let tableId = this.route.snapshot.paramMap.get('id');    
    this.tableService.getTable(tableId).subscribe(
      res=>{
        console.log('TABLE OBTENIDA', res);
        this.table = res.table;
        this.owner = res.table.owner;
        console.log('this.owner', this.owner);
      }
    );
  }

}
