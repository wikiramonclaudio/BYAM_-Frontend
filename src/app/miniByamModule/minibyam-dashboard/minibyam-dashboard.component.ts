import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
declare var $;
@Component({
  selector: 'app-minibyam-dashboard',
  templateUrl: './minibyam-dashboard.component.html',
  styleUrls: ['./minibyam-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MinibyamDashboardComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    $('.bg-minibyam-home').css('background-image', 'url(assets/images/minibyam/bg-stadium.png)');
  }

}
