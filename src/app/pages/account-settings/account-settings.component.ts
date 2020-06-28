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
  activeTheme;
  constructor(
    public _settingsService: SettingsService,
    public translationService: TranslationService
  ) {
    this.activeTheme = JSON.parse(localStorage.getItem('settings')).theme || 'default';
  }

  ngOnInit() {
    this.translate = this.translationService.getTranslateService();
  }

  changeColor(theme: string) {
    this._settingsService.applyTheme(theme);
    this.activeTheme = theme;
  }
  addChecked() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._settingsService.settings;
    for (const selector of selectores) {
     if (selector.getAttribute('data-theme') == tema) {
      selector.classList.add('working');
      break;
     }
    }
  }

  changeLanguage(lang: string) {
    this.translationService.changeLanguage(lang);
  }

}
