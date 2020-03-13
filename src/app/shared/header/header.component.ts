import { TranslationService } from './../../services/translation/translation.service';
import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { UserService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  public translate: TranslateService;
  constructor(
    public userService: UserService,
    public router: Router,
    public translationService: TranslationService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.translate = this.translationService.getTranslateService();
  }

  buscar(termino: string) {
    this.router.navigate(['/search', termino]);
  }

  changeLanguage(lang:string){
    this.translationService.changeLanguage(lang);
  }

  showCallsPanel(){
    var videoContainer = document.querySelector('.video-container');
    var jQueryVideocontainer = $('.video-container');
    console.log('VIdeo container', videoContainer);
    console.log('jQueryVideocontainer container', jQueryVideocontainer);
    jQueryVideocontainer.toggle();
  }

}
