import { MatchService } from './../../../services/match/match.service';
import { Match } from './../../../models/match.model';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css']
})
export class CreateMatchComponent implements OnInit {

  match: Match = new Match('','','','','', '');  
  matches: Match [];
  translate: TranslateService;
  constructor(
    private matchService: MatchService,
    public translationService: TranslationService
  ) { }

  ngOnInit() {
    this.translate = this.translationService.getTranslateService();
  }

  createMatch(){        
    this.match.where = 'SEGOVIA';
    // console.log(this.match.when);
    // var cepillo = new Date(this.match.when).toISOString();
    // console.log('CEPILLO', cepillo);
    // this.match.when = cepillo;
    this.matchService.createMatch(this.match).subscribe(
      res=>{
        // console.log('Creado nuevo partido', res);        
      }
    )
  }

}
