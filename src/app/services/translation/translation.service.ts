import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public activeLang = 'es';
  constructor(
    private translate: TranslateService
  ) {
    let browserLang = this.translate.getBrowserLang();
    // this.translate.use(browserLang.match(/en|id/) ? browserLang : 'en');
    this.translate.setDefaultLang(browserLang);
  }

  public changeLanguage(lang) {
    this.activeLang = lang;
    this.translate.use(lang);
  }
  public getActiveLang() {
    return this.activeLang;
  }
  getTranslateService() {
    return this.translate;
  }
}
