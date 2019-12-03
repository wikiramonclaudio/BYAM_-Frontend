import { MatchService } from './../../../services/match/match.service';
import { Match } from './../../../models/match.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css']
})
export class CreateMatchComponent implements OnInit {

  match: Match = new Match('','','','','', '');  
  matches: Match [];
  constructor(
    private matchService: MatchService
  ) { }

  ngOnInit() {
  }

  createMatch(){        
    this.match.where = 'SEGOVIA';
    this.matchService.createMatch(this.match).subscribe(
      res=>{
        // console.log('Creado nuevo partido', res);        
      }
    )
  }

  getMatchesByTable(){

  }

}
