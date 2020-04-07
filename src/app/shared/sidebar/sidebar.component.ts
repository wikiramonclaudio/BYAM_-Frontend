import { TranslationService } from './../../services/translation/translation.service';
import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from 'src/app/services/service.index';
import { TranslateService } from '@ngx-translate/core';
declare var $;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: any;
  menu: any = {};
  translate: TranslateService;
  constructor(
    public _sidebarService : SidebarService,
    public userService: UserService,
    public translationService: TranslationService
  ) {
    this.translate = this.translationService.getTranslateService();
  }

  ngOnInit() {
    this.user = this.userService.user;
    this.translate.setDefaultLang(this.translationService.getActiveLang());
  }

  hideMiniSidebar(){
    var sidebar = document.querySelector('.mini-sidebar');
    if(sidebar){
      $('.mini-sidebar').removeClass('show-sidebar');
    }

  }
}
