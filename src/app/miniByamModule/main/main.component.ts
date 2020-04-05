import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogModule, Dialog } from 'primeng/dialog';
import swal from 'sweetalert';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  display: boolean = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  newLeague(type: string) {
    const el: any = { content: 'input', inputValue: '' };
    swal('Nombre de la partida - ' + type, el).then((value) => {
      if (value.length > 2) {
       console.log('AQUI GUARDAR LA PARTIDA Y NAVEGAR PA EMPEZAR A JUGAR');
        this.router.navigate(['minibyam/minibyam-dashboard']);
      }
    });
  }

}
