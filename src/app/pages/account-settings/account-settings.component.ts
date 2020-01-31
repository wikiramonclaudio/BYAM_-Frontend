import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  translate: TranslateService;
  constructor(    
    public _settingsService: SettingsService,
    public translationService: TranslationService
  ) {  }

  ngOnInit() {
    this.translate = this.translationService.getTranslateService();
  }

  changeColor(theme: string, link: any){    
    this.checkApply(link);    
    this._settingsService.applyTheme(theme);
  }

  checkApply(link){
    let selectores: any = document.getElementsByClassName('selector');
    for (let selector of selectores) {
      selector.classList.remove('working');
    }
    link.classList.add('working');

  }

  addChecked(){
    let selectores: any = document.getElementsByClassName('selector');

    let tema = this._settingsService.settings;
    for (let selector of selectores) {
     if(selector.getAttribute('data-theme') == tema){
      selector.classList.add('working');
      break;
     }
    }
  }
  
  changeLanguage(lang:string){
    this.translationService.changeLanguage(lang);
  }

}
