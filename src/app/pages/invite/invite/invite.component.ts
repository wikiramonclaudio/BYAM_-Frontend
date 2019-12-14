import { UserService } from 'src/app/services/service.index';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  invitation: any = {};
  public text: string = 'Hola, estoy jugando en la aplicación BYAM con mis amigos, lo pasamos muy bien te invito a unirte, te va a encantar! https://byam.cleverapps.io';
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.invitation.body = 'Hola amigo, estoy Jugando en BYAM apuestas. Te invito a jugar es muy divertido y puedes ganar dinero.';    
  }

  sendInvitation(){
    this.userService.inviteFriend(this.invitation).subscribe(
      res=>{
        swal('Invitación enviada', 'La invitación se ha enviado correctamente a ' + this.invitation.name, 'success');
        this.invitation = {};
      }
    )    
  }

}
