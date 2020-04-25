import { Router } from '@angular/router';
import { ChatroomService } from './../../services/chatroom/chatroom.service';
import { Message } from './../../models/message.model';
import { MessageService } from './../../services/message/message.service';
import { WebsocketService } from './../../services/websocket.service';
import { User } from './../../models/user.model';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert';
declare var $: any;

@Component({
  selector: 'byam-minichat',
  templateUrl: './minichat.component.html',
  styleUrls: ['./minichat.component.css']
})
export class MinichatComponent implements OnInit {

  public translate: TranslateService;
  users: any[] = [];
  selectedUser: any = new User('', '', '', '');
  msg: any = '';
  activeTable: any = 'general';
  activeRoom: any = 'general';
  messages: any[] = [];
  callDomain: any = '';
  callOptions: any = {};
  initUsers: any[] = [];
  searchChatUser: any = '';
  chatVisible: any = false;
  @ViewChild('messageInput', { static: true }) searchElement: ElementRef;
  constructor(
    public userService: UserService,
    public websocketService: WebsocketService,
    public messageService: MessageService,
    public chatRoomService: ChatroomService,
    public router: Router,
    public translationService: TranslationService
  ) {
    // this.selectedUser = this.userService.user;
  }

  ngOnInit(): void {
    this.hideChat(0);
    this.translate = this.translationService.getTranslateService();
    this.getUsers();
    this.subscribeToEvents();
    this.websocketService.listen('inviteRoom', {}).subscribe(
      (res: any) => {
        this.selectedUser = res.emiter;
        swal({
          title: res.emiter.name + ' quiere chatear contigo',
          text: 'Aceptas su invitación??',
          icon: 'info',
          buttons: ['No', 'Si'],
          // dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              const newRoom = {
                user1: res.emiter._id,
                user2: res.receiver._id,
                lastcontent: 'Empecemos a hablar!'
              };
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
        var mensaje: any = {};
        if (res.type && res.type == 'call') {
          mensaje = {
            owner: res.emiter,
            content: res.message,
            callDomain: res.callDomain,
            callOptions: res.callOptions
          };
        } else {
          mensaje = {
            owner: res.emiter,
            content: res.message
          };
        }
        if ((mensaje.owner._id == this.selectedUser._id)) {
          this.messages.push(mensaje);
          this.msg = '';
        }
        setTimeout(() => {
          this.scrolDown();
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
        if (res.tableId == 'general' && res.onlineUsers) {
          this.users.forEach((user) => {
            const userConnected = res.onlineUsers.find((el) => {
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
    );
    this.websocketService.listen('leaveTable', {}).subscribe(
      (res: any) => {
        if (res.user._id != this.userService.user._id && res.tableId == 'general') {
          this.users.forEach((user) => {
            user.connected = false;
            const userConnected = res.onlineUsers.find((el) => {
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
    );
    this.websocketService.listen('privateChatAlert', {}).subscribe(
      (res: any) => {
        if (res.emiter._id != this.selectedUser._id) {
          const emiter = this.users.find((user) => {
            return res.emiter._id == user._id;
          });
          emiter.lastcontent = res.message;
          emiter.alerting = true;
          if (!this.chatVisible) {
            $('#prime').addClass('alert-msg-button');
          }
        }
      }
    );
  }

  getUsers() {
    this.userService.getRanking().subscribe(
      (res: any) => {
        if (res.users.lenght > 0) {
          this.selectedUser = res.users[0];
        }
        this.users = res.users.filter((user) => {
          return user._id != this.userService.user._id;
        });
        this.initUsers = res.users;
        this.initSockets('general');
      }
    );
  }

  switchUserChat(user: any) {
    this.hideChat(1);
    // this.websocketService.emit('leaveTable', { tableId: this.activeTable, user: this.userService.user });
    this.selectedUser = user;
    this.selectedUser.alerting = false;
    this.chatRoomService.getChatRooms(this.userService.user._id, this.selectedUser._id).subscribe(
      (res: any) => {
        if (!res.chatrooms) {
          this.messages = [];
          swal({
            title: 'Hablar con ' + this.selectedUser.name,
            text: 'Todavía no has hablado con ' + this.selectedUser.name + ', quieres enviarle una invitación para chatear?',
            icon: 'warning',
            buttons: ['No', 'Si']
          })
            .then((willDelete) => {
              if (willDelete) {
                const socketData = {
                  emiter: this.userService.user,
                  receiver: this.selectedUser
                };
                this.websocketService.emit('inviteRoom', socketData);
                // this.searchElement.nativeElement.focus();
              }
            });

        } else {
          this.messageService.getMessagesByTable(res.chatrooms._id).subscribe(
            (data: any) => {
              this.messages = data.messages;
              this.activeTable = res.chatrooms._id;
              this.initSockets(res.chatrooms._id);
              setTimeout(() => {
                this.scrolDown();
                // this.searchElement.nativeElement.focus();
              }, 0);
            }
          );

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
    const msg = new Message(this.userService.user._id, this.activeTable, this.msg);
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
          console.log('mensaje enviado', res);
          let mensaje = {
            owner: this.userService.user,
            content: this.msg
          };
          if ((mensaje.owner._id == this.userService.user._id)) {
            this.messages.push(mensaje);
            this.msg = '';
          }
        }
      );
    } else {
      swal('Escribe algo para enviar a ' + this.selectedUser.name, 'Campo obligatorio', 'warning');
    }
  }

  sendCall() {
    const msg = new Message(this.userService.user._id, this.activeTable, '123call');
    // enviar mensaje al servidor
    this.messageService.createMessage(msg).subscribe(
      res => {
        const domain = 'byam.cleverapps.io';
        const options = {
          roomName: this.userService.user._id + this.selectedUser._id,
          width: '80%',
          height: '80%',
          // password: 'bartolez',
          interfaceConfigOverwrite: {
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_JITSI_WATERMARK: false,
            CLOSE_PAGE_GUEST_HINT: false,
            SHOW_PROMOTIONAL_CLOSE_PAGE: false,
            RANDOM_AVATAR_URL_PREFIX: false,
            // SHOW_DEEP_LINKING_IMAGE: false,
            // RANDOM_AVATAR_URL_SUFFIX: false,
            SHOW_BRAND_WATERMARK: false,
            // GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
            DISPLAY_WELCOME_PAGE_CONTENT: false,
            DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
            APP_NAME: 'BYAM Juegos',
            NATIVE_APP_NAME: 'BYAM Between you and me',
            JITSI_WATERMARK_LINK: 'https://byam.cleverapps.io',
            // SHOW_POWERED_BY: false,SHOW_DEEP_LINKING_IMAGE: false,DEFAULT_BACKGROUND: '#000',
            // INVITATION_POWERED_BY: false,
            MOBILE_APP_PROMO: false,
            SHOW_CHROME_EXTENSION_BANNER: false
          },
          configOverwrite: {
            // enableNoAudioDetection: false,
            // enableNoisyMicDetection: false,
            enableWelcomePage: false,
            enableClosePage: false,
            defaultLanguage: 'es',
            disableDeepLinking: true,
            // disableThirdPartyRequests: false,
            testing: {
              // Enables experimental simulcast support on Firefox.
              enableFirefoxSimulcast: true
            }
          }
          // parentNode: document.querySelector('#meet')
        };
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
  }

  searchInput(value: any) {
    if (this.searchChatUser.length > 0) {
      this.users = this.users.filter((user) => {
        return user.name.toLowerCase().indexOf(this.searchChatUser.toLowerCase()) > -1;
      });
    } else {
      this.users = this.initUsers;
    }
  }

  // switch views within chat window
  hideChat(hide) {
    switch (hide) {
      case 0:
        $('#chat_converse').css('display', 'none');
        $('.chat_login').css('display', 'block');
        $('.chat_fullscreen_loader').css('display', 'none');
        $('#chat_fullscreen').css('display', 'none');
        this.selectedUser = this.userService.user;
        break;
      case 1:
        $('#chat_converse').css('display', 'block');
        $('.chat_login').css('display', 'none');
        $('.chat_fullscreen_loader').css('display', 'block');
        this.scrolDown();
        break;
      case 2:
        $('#chat_converse').css('display', 'none');
        $('.chat_login').css('display', 'none');
        $('.chat_fullscreen_loader').css('display', 'block');
        break;
    }
  }

  // toggle classes to button that shows chat
  toggleFab() {
    $('.prime').toggleClass('zmdi-comment-outline');
    $('.prime').toggleClass('zmdi-close');
    $('.prime').toggleClass('is-active');
    $('.prime').toggleClass('is-visible');
    $('#prime').toggleClass('is-float');
    $('.chat').toggleClass('is-visible');
    $('.fab').toggleClass('is-visible');
    this.chatVisible = !this.chatVisible;
    if (this.chatVisible) {
      $('#prime').removeClass('alert-msg-button');
    }
  }

  // get full screen mode to chat window
  getFullScreenMode() {
    $('.fullscreen').toggleClass('zmdi-window-maximize');
    $('.fullscreen').toggleClass('zmdi-window-restore');
    $('.chat').toggleClass('chat_fullscreen');
    $('.fab').toggleClass('is-hide');
    $('.header_img').toggleClass('change_img');
    $('.img_container').toggleClass('change_img');
    $('.chat_header').toggleClass('chat_header2');
    $('.fab_field').toggleClass('fab_field2');
    $('.chat_converse').toggleClass('chat_converse2');
  }

  // put scroll down to converse
  scrolDown() {
    const chatPanel = document.querySelector('#chat_converse');
    chatPanel.scrollTop = chatPanel.scrollHeight;
    if ((window.innerWidth <= 768)) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }

}
