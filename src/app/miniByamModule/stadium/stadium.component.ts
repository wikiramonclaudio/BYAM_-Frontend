import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnInit {

  remodelings: any = [
    {
      name: 'Focos',
      newValue: '1.000 kW',
      price: 20000
    },{
      name: 'Vestuarios',
      newValue: 'Funcional',
      price: 10000
    },{
      name: 'Accesos',
      newValue: 'Funcionales',
      price: 20000
    },{
      name: 'Lavabos WC',
      newValue: '40 WC',
      price: 20000
    },{
      name: 'Calefacción cesped',
      newValue: 'Completa',
      price: 20000
    },{
      name: 'Parking',
      newValue: '1500',
      price: 20000
    },
    {
      name: 'Gradas',
      newValue: '7000',
      price: 100000
    }
  ];

  ticketPrice = 10;
  constructor() { }

  ngOnInit(): void {
  }

  changeTicketPrice(amount) {
    if (amount == -5 && this.ticketPrice == 5) {
      console.log('Nothing');
    } else {
      this.ticketPrice = this.ticketPrice + amount;
    }
  }

}
