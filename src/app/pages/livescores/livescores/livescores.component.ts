import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-livescores',
  templateUrl: './livescores.component.html',
  styleUrls: ['./livescores.component.css']
})
export class LivescoresComponent implements OnInit {
  // 1 spain, 2-england, 3-Italy
  selectedCountry: any = 1;
  constructor(@Inject(DOCUMENT) private document: any) {

  }

  ngOnInit() {
  }

  loadScript() {
  }
}
