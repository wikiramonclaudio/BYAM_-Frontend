import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {
  public activeLang = 'es';
  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.activeLang);
  }
  ngOnInit() {
    let browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|id/) ? browserLang : 'en');
  }
  public cambiarLenguaje(lang) {
    this.activeLang = lang;
    this.translate.use(lang);
  }
  getActiveLang(){
    return this.activeLang;
  }
  getTranslateService(){
    return this.translate;
  }
}