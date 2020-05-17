import { UserService } from 'src/app/services/service.index';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  users: User [];
  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getRanking().subscribe(
      (res: any) => {
        this.users = res.users;
      }
    );
  }

}
