import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livescores',
  templateUrl: './livescores.component.html',
  styleUrls: ['./livescores.component.css']
})
export class LivescoresComponent implements OnInit {
// 1 spain, 2-england, 3-Italy
  selectedCountry: any = 1;
  constructor() { }

  ngOnInit() {
  }

  setCountryFilter(value){
    this.selectedCountry = value;
  }

}
