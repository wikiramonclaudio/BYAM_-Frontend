import { Component, OnInit } from '@angular/core';

declare function initPlugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css']
})
export class NopagefoundComponent implements OnInit {
  anio = new Date().getFullYear();
  constructor() { }

  ngOnInit() {
    initPlugins();
  }

}
