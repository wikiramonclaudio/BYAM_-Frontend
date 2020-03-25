import { Router } from '@angular/router';
import { ChatroomService } from './../../services/chatroom/chatroom.service';
import { Message } from './../../models/message.model';
import { MessageService } from './../../services/message/message.service';
import { WebsocketService } from './../../services/websocket.service';
import { User } from './../../models/user.model';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
declare var $: any;
declare var JitsiMeetExternalAPI;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users: any[] = [];
  selectedUser: User = new User('', '', '', '');
  msg: any = '';
  activeTable: any = 'general';
  activeRoom: any = 'general';
  messages: any[] = [];
  callDomain: any = '';
  callOptions: any = {};
  initUsers: any[] = [];
  constructor(
    public userService: UserService,
    public websocketService: WebsocketService,
    public messageService: MessageService,
    public chatRoomService: ChatroomService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
    this.subscribeToEvents();
    this.websocketService.listen('inviteRoom', {}).subscribe(
      (res: any) => {
        this.selectedUser = res.emiter;
        swal({
          title: res.emiter.name + ' quiere chatear contigo',
          text: "Aceptas su invitación??",
          icon: "info",
          buttons: ['No', 'Si'],
          // dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              var newRoom = {
                user1: res.emiter._id,
                user2: res.receiver._id,
                lastcontent: 'Empecemos a hablar!'
              }
              // crear chat room
              this.chatRoomService.createChatRoom(newRoom).subscribe(
                (res: any) => {
                  this.activeTable = res._id;
                  this.websocketService.emit('newChatRoom', {
                    emiter: this.userService.user,
                    receiver: this.selectedUser,
                    tableId: res._id
                  });
                  this.initSockets(res._id);
                }
              );

            } else {

            }
          });
      }
    );
  }

  subscribeToEvents() {
    this.websocketService.listen('privateChatMessage', {}).subscribe(
      (res: any) => {
        if (res.type && res.type == 'call') {
          var msg: any = {
            owner: res.emiter,
            content: res.message,
            callDomain: res.callDomain,
            callOptions: res.callOptions
          };
        } else {
          var msg: any = {
            owner: res.emiter,
            content: res.message
          };
        }
        this.messages.push(msg);
        this.msg = '';
        setTimeout(() => {
          var chatPanel = document.querySelector('.chat-panel');
          chatPanel.scrollTop = chatPanel.scrollHeight;
          if ((window.innerWidth <= 768)) {
            window.scrollTo(0, document.body.scrollHeight);
          }
        }, 0);
      }
    );
    this.websocketService.listen('newChatRoom', {}).subscribe(
      (res: any) => {
        this.activeTable = res.tableId;
        this.initSockets(res.tableId);
        this.selectedUser = res.emiter;
      }
    );
    this.websocketService.listen('newPlayerInTable', {}).subscribe(
      (res: any) => {
        if(res.tableId == 'general'){
          this.users.forEach((user) => {
            var userConnected = res.onlineUsers.find((el) => {
              return el.userId == user._id;
            });
            if (userConnected) {
              user.connected = true;
            } else {
              user.connected = false;
            }
  
          });
        }
      }
    )
    this.websocketService.listen('leaveTable', {}).subscribe(
      (res: any) => {
        if (res.user._id != this.userService.user._id && res.tableId == 'general') {
          this.users.forEach((user) => {
            user.connected = false;
            var userConnected = res.onlineUsers.find((el) => {
              return el.userId == user._id;
            });
            if (userConnected && (userConnected._id != this.userService.user._id)) {
              user.connected = true;
            } else {
              user.connected = false;
            }
          });
        }
      }
    )
  }

  getUsers() {
    this.userService.getRanking().subscribe(
      (res: any) => {
        if (res.users.lenght > 0)
          this.selectedUser = res.users[0];
        this.users = res.users.filter((user) => {
          return user._id != this.userService.user._id;
        });
        this.initUsers = res.users;
        this.initSockets('general');
      }
    );
  }

  switchUserChat(user: any) {
    // this.websocketService.emit('leaveTable', { tableId: this.activeTable, user: this.userService.user });
    this.selectedUser = user;
    $('.chat-bubble').hide('slow').show('slow');
    //obtener mensages de esta sala     
    this.chatRoomService.getChatRooms(this.userService.user._id, this.selectedUser._id).subscribe(
      (res: any) => {
        if (!res.chatrooms) {
          this.messages = [];
          swal({
            title: "Hablar con " + this.selectedUser.name,
            text: "Todavía no has hablado con " + this.selectedUser.name + ", quieres enviarle una invitación para chatear?",
            icon: "warning",
            buttons: ['No', 'Si']
          })
            .then((willDelete) => {
              if (willDelete) {
                // enviar invitación al otro usuario
                let socketData = {
                  emiter: this.userService.user,
                  receiver: this.selectedUser
                };
                this.websocketService.emit('inviteRoom', socketData);
              } else {

              }
            });

        } else {
          this.messageService.getMessagesByTable(res.chatrooms._id).subscribe(
            (data: any) => {
              this.messages = data.messages;
              this.activeTable = res.chatrooms._id;
              this.initSockets(res.chatrooms._id);
              setTimeout(() => {
                var chatPanel = document.querySelector('.chat-panel');
                chatPanel.scrollTop = chatPanel.scrollHeight;
                if ((window.innerWidth <= 768)) {
                  window.scrollTo(0, document.body.scrollHeight);
                }
              }, 0);
            }
          )

        }
      }
    );
  }

  initSockets(tableId: string) {
    this.websocketService.emit('joinInTable', { user: this.userService.user, tableId: this.activeTable });
  }

  ngOnDestroy(): void {
    console.log('ng destroy SE ABANDONA EL la sala');
    this.websocketService.emit('leaveTable', { tableId: this.activeTable, user: this.userService.user });
    this.websocketService.emit('leaveTable', { tableId: 'general', user: this.userService.user });
  }

  refresh() {
    this.websocketService.emit('leaveTable', { tableId: this.activeTable, user: this.userService.user });
    this.websocketService.emit('leaveTable', { tableId: 'general', user: this.userService.user });
    this.ngOnInit();
  }

  sendMessage() {
    var msg = new Message(this.userService.user._id, this.activeTable, this.msg);
    if (this.msg.length > 0) {
      // enviar mensaje al servidor
      this.messageService.createMessage(msg).subscribe(
        res => {
          this.websocketService.emit('privateChatMessage', {
            emiter: this.userService.user,
            receiver: this.selectedUser,
            tableId: this.activeTable,
            message: this.msg
          });
        }
      );
    } else {
      swal('Escribe algo para enviar a ' + this.selectedUser.name, 'Campo obligatorio', 'warning');
    }
  }

  sendCall() {
    var msg = new Message(this.userService.user._id, this.activeTable, '123call');
    // enviar mensaje al servidor
    this.messageService.createMessage(msg).subscribe(
      res => {
        var domain = "byam.cleverapps.io";
        var options = {
          roomName: this.userService.user._id + this.selectedUser._id,
          width: '80%',
          height: '80%',
          password: 'bartolez',
          interfaceConfigOverwrite: {
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_JITSI_WATERMARK: false,
            CLOSE_PAGE_GUEST_HINT: false,
            SHOW_PROMOTIONAL_CLOSE_PAGE: false,
            RANDOM_AVATAR_URL_PREFIX: false,
            SHOW_DEEP_LINKING_IMAGE: false,
            RANDOM_AVATAR_URL_SUFFIX: false,
            SHOW_BRAND_WATERMARK: false,
            GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
            DISPLAY_WELCOME_PAGE_CONTENT: false,
            DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
            APP_NAME: 'BYAM Juegos',
            NATIVE_APP_NAME: 'BYAM Between you and me',
            JITSI_WATERMARK_LINK: 'https://byam.cleverapps.io',
            // SHOW_POWERED_BY: false,SHOW_DEEP_LINKING_IMAGE: false,DEFAULT_BACKGROUND: '#000',
            // INVITATION_POWERED_BY: false,
            MOBILE_APP_PROMO: true,
            SHOW_CHROME_EXTENSION_BANNER: false
          },
          configOverwrite: {
            enableNoAudioDetection: false,
            enableNoisyMicDetection: false,
            enableWelcomePage: false,
            enableClosePage: false,
            useIPv6: true,
            defaultLanguage: 'es',
            // disableThirdPartyRequests: false,            
            testing: {
              // Enables experimental simulcast support on Firefox.
              enableFirefoxSimulcast: true
            }
          }
          // parentNode: document.querySelector('#meet')
        }
        // var api = new JitsiMeetExternalAPI(domain, options);
        this.websocketService.emit('privateChatMessage', {
          type: 'call',
          emiter: this.userService.user,
          receiver: this.selectedUser,
          tableId: this.activeTable,
          message: '123call',
          callDomain: domain,
          callOptions: options
        });
      }
    );
  }

  openCall(message) {

    this.router.navigate(['/meet'], { queryParams: { options: message.callOptions } });

    // var options = message.callOptions;
    // var wd = window.open('', '_blank');
    // wd.location.href = 'https://';
    // setTimeout(() => {      
    //   console.log('wd', wd);
    //   wd.history.pushState({},"BYAM - Meet","/");
    // }, 3000);
    // var head = wd.document.getElementsByTagName("head")[0];
    // var script: any = wd.document.createElement("script");
    // script.src = 'https://meet.jit.si/external_api.js';
    // head.appendChild(script);
    // script.addEventListener('load', function () {
    //   var newScript = wd.document.createElement("script");
    //   newScript.type = 'text/javascript';
    //   newScript.text = `var api = new JitsiMeetExternalAPI(  "meet.jit.si", ${JSON.stringify(options)});`;
    //   wd.document.title = 'BYAM - Meet';
    //   wd.document.body.appendChild(newScript);
    // });    
  }

  searchInput(value: any) {
    // if(event.keyCode == 13) {
    //   this.sendMessage();
    // }
    if (this.msg.length > 0) {
      this.users = this.users.filter((user) => {
        return user.name.indexOf(value);
      });
    } else {
      this.users = this.initUsers;
    }
  }
}
