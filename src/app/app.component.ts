import { Component, Inject } from '@angular/core';

// import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BYAM';

  constructor(
    // @Inject(DOCUMENT) private _document,
    public _settingsService: SettingsService
  ){

  }
}
