import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import swal from 'sweetalert';
import { PickListModule } from 'primeng/picklist';
import {DropdownModule} from 'primeng/dropdown';
declare var $;
@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  @Input() halfTime:boolean;
  tactic:any;
  tactics = [
    { label: '3-4-3', value: '3-4-3'},
    { label: '3-5-2', value: '3-5-2'},
    { label: '3-3-4', value: '3-3-4'},
    { label: '4-5-1', value: '4-5-1'},
    { label: '4-4-2', value: '4-4-2'},
    { label: '4-3-3', value: '4-3-3'},
    { label: '4-2-4', value: '4-2-4'},
    { label: '5-4-1', value: '5-4-1'},
    { label: '5-3-2', value: '5-3-2'},
    { label: '5-2-3', value: '5-2-3' }
  ];
  players = [
    {
      name: 'Raul Moñiguez',
      average: 65,
      pos: 'Por',
      sequence: 1
    },
    {
      name: 'Walter Periguayonson',
      average: 60,
      pos: 'Med',
      sequence: 7
    },
    {
      name: 'Wilson Daniel',
      average: 59,
      pos: 'Def',
      sequence: 4
    },
    {
      name: 'Nono',
      average: 61,
      pos: 'Def',
      sequence: 5
    },
    {
      name: 'Croque',
      average: 68,
      pos: 'Med',
      sequence: 7
    },
    {
      name: 'Davizuno',
      average: 61,
      pos: 'Del',
      sequence: 9
    },

    {
      name: 'Iñigo Iñiguez',
      average: 68,
      pos: 'Def',
      sequence: 2
    },
    {
      name: 'David Rodillackson',
      average: 71,
      pos: 'Med',
      sequence: 8
    },
    {
      name: 'Juan Casillos',
      average: 71,
      pos: 'Del',
      sequence: 11
    },
    {
      name: 'Jose Luis',
      average: 67,
      pos: 'Med',
      sequence: 8
    },
    {
      name: 'Filipe',
      average: 57,
      pos: 'Del',
      sequence: 9
    }
  ];
  selectedplayers = [
    {
      name: 'Federico Tornices',
      average: 65,
      pos: 'Por',
      sequence: 1
    },
    {
      name: 'Paco Ramirez',
      average: 68,
      pos: 'Def',
      sequence: 2
    },
    {
      name: 'Felipe Robaesteras',
      average: 56,
      pos: 'Def',
      sequence: 4
    },
    {
      name: 'Antonio Ramirez',
      average: 68,
      pos: 'Def',
      sequence: 5
    },
    {
      name: 'Raul Stoickov',
      average: 64,
      pos: 'Del',
      sequence: 10
    },
    {
      name: 'Koko',
      average: 58,
      pos: 'Med',
      sequence: 6
    },
    {
      name: 'None',
      average: 65,
      pos: 'Med',
      sequence: 6
    },
    {
      name: 'Jose Manuel Rodrigales',
      average: 65,
      pos: 'Def',
      sequence: 3
    },
    {
      name: 'Roberto Flipales',
      average: 65,
      pos: 'Por',
      sequence: 1
    },
    {
      name: 'Tornices',
      average: 67,
      pos: 'Med',
      sequence: 7
    },
  ];
  titulares = [];
  reservas = [];
  totalPlayers = [];
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // const wrapper: any = document.querySelector('.bg-minibyam-home');
    if(!this.halfTime)
      $('.bg-minibyam-home').css('background-image', 'url(assets/images/minibyam/vestuario.jpg)');
    this.titulares = this.players.sort(function (a, b) {
      if (a.sequence > b.sequence) {
        return 1;
      }
      if (a.sequence < b.sequence) {
        return -1;
      }
      return 0;
    });
    this.reservas = this.selectedplayers.sort(function (a, b) {
      if (a.sequence > b.sequence) {
        return 1;
      }
      if (a.sequence < b.sequence) {
        return -1;
      }
      return 0;
    });
    this.totalPlayers = this.titulares.concat(this.reservas);
  }

  changeTactic(){
    switch(this.tactic){
      case '3-4-3':
          this.updateTitularTeam(3, 4, 3);
         break;
      case '3-5-2':
        this.updateTitularTeam(3, 5, 2);
         break;
      case '3-3-4':
        this.updateTitularTeam(3, 3, 4);
         break;
      case '4-5-1':
        this.updateTitularTeam(4,5,1)
         break;
      case '4-4-2':
        this.updateTitularTeam(4,4,2)
         break;
      case '4-3-3':
        this.updateTitularTeam(4,3,3)
         break;
      case '4-2-4':
        this.updateTitularTeam(4,2,4)
         break;
      case '5-4-1':
        this.updateTitularTeam(5,4,1)
         break;
      case '5-3-2':
        this.updateTitularTeam(5,3,2)
         break;
      case '5-2-3':
        this.updateTitularTeam(5,2,3)
         break;
    }
  }

  updateTitularTeam(numDef, numMed, numDel){
    const porteros = this.players.filter((player)=>{
      return player.pos == 'Por';
    });
    const defensas = this.players.filter((player)=>{
      return player.pos == 'Def';
    });
    const medios = this.players.filter((player)=>{
      return player.pos == 'Med';
    });
    const delanteros = this.players.filter((player)=>{
      return player.pos == 'Del';
    });

    let titulares = [];
    const portero = this.players.find((player)=>{
      return player.pos == 'Por';
    });

    titulares.push(portero);

    for(let i = 0; i< numDef; i++){
        for(let x=0; x< this.reservas.length; x++){
            this.reservas.forEach((el, index)=>{
              if(el.pos == 'Def'){
                if(defensas.length < numDef){
                  defensas.push(this.reservas[index])
                  this.reservas.splice(index, 1);
                }
              }
            });
        }
      if(i <= numDef+1 && defensas[i])
        titulares.push(defensas[i]);
    }
    for(let i = 0; i< numMed; i++){
      for(let x=0; x< this.reservas.length; x++){
        this.reservas.forEach((el, index)=>{
          if(el.pos == 'Med'){
            if(medios.length < numMed){
              medios.push(this.reservas[index])
              this.reservas.splice(index, 1);
            }
          }
        });
      }
        if(i <= numMed+1 && medios[i])
          titulares.push(medios[i]);
    }
    for(let i = 0; i< numDel; i++){
      for(let x=0; x< this.reservas.length; x++){
        this.reservas.forEach((el, index)=>{
          if(el.pos == 'Del'){
            if(delanteros.length < numDel){
              delanteros.push(this.reservas[index])
              this.reservas.splice(index, 1);
            }
          }
        });
      }
      if(i <= numDel+1 && delanteros[i])
        titulares.push(delanteros[i]);
    }
    console.log('titulares', titulares);
    this.titulares = titulares;
    this.reservas = this.totalPlayers.filter((el)=>{
      return this.titulares.some(function(arrVal) {
        return el === arrVal;
      }) == false;
    })
  }

  checkTitulares(){
    this.reservas = this.reservas.sort(function (a, b) {
      if (a.sequence > b.sequence) {
        return 1;
      }
      if (a.sequence < b.sequence) {
        return -1;
      }
      return 0;
    });
    this.titulares = this.titulares.sort(function (a, b) {
      if (a.sequence > b.sequence) {
        return 1;
      }
      if (a.sequence < b.sequence) {
        return -1;
      }
      return 0;
    });
  }

  playGame(){
    if(this.titulares.length!=11){
      swal('Error', 'El número de jugadores titulares debe ser 11, revisa tu equipo titular y asegúrate que has seleccionado 11 jugadores titulares.', 'warning');
    }else{
      this.router.navigate(['/minibyam/livegame']);
    }
  }

  getPlayers(){
     // OBTENER JUGADORES ITALIA
    // this.userService.getJurorores().subscribe(
    //   (res:any)=>{
    //     console.log('YEYEYE', res);
    //   }
    // )
  }

}
