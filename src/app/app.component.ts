import { PeerService } from './services/peer/peer.service';
import { UserService } from './services/user/user.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert';
// import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from './services/service.index';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost 
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false
  };

  @ViewChild('myvideo', { read: null, static: false }) myvideo: any;

  title = 'BYAM';
  peer: any;
  anotherId;
  mypeerid;
  users: User[] = [];
  selectedUser: string;
  constructor(
    // @Inject(DOCUMENT) private _document,
    public _settingsService: SettingsService,
    public userService: UserService,
    public peerService: PeerService
  ) {
  }
  ngOnInit() {
    // let video = null;
    // //no funciona bien si le paso el id del user(si le quito el parametro si funciona)
    // this.peer = new Peer(this.userService.user._id);
    // setTimeout(() => {
    //   this.mypeerid = this.peer.id;
    //   console.log('mypeerid', this.mypeerid);
    //   video = this.myvideo.nativeElement;
    //   this.peer.on('connection', function (conn) {
    //     conn.on('data', function (data) {
    //       console.log('DATA PEER JS', data);
    //     });
    //   });
    //   // this.connect();
    // }, 3000);
    // var n = <any>navigator;

    // n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);

    // this.peer.on('call', (call) => {
    //   console.log('CAALLLLL???', call);
    //   swal('LLamada entrante', 'contestar??', {buttons: ['Rechazar', 'Aceptar']}).then((value) => {        
    //     if (value == true) {
    //       n.getUserMedia({ video: true, audio: true },  (stream) => {
    //         call.answer(stream);
    //         call.on('stream', (remotestream) => {
    //           const video: any = document.getElementById('myvideo');
    //           if ('srcObject' in video) {
    //             video.srcObject = remotestream;
    //             video.play();
    //           } else {
    //             // Avoid using this in new browsers, as it is going away.
    //             video.src = URL.createObjectURL(remotestream);
    //           }
    //           var closeCallBtn = document.getElementById('endcall');
    //           if(closeCallBtn){
    //             closeCallBtn.addEventListener('click', (event)=>{                  
    //               call.close();
    //               this.stopStreaming(stream);
    //             });
    //           }
    //         });
    //       }, function (err) {
    //         console.log('Failed to get stream', err);
    //       })
    //     }
    //   });

    // })
  }

  getUsers(){
    this.userService.getUsers(0).subscribe(
      res=>{
        this.users = res.users;        
      }
    )
  }

  connect() {
    var conn = this.peer.connect(this.userService.user._id);
    if(conn){
      conn.on('open', function (something) {
        //receive msessages
        conn.on('data', function (data) {
          console.log('received', data);
        });
        //send messages
        conn.send('Message from that id', something);
      });
    }
  }

  startCall() {
    this.peerService.startCall(this.selectedUser);
    // var n = <any>navigator;
    // n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
    // n.getUserMedia({ video: true, audio: true }, (stream) => {
    //   // Call a peer, providing our mediaStream
    //   // no funciona cuando le paso el this.selectedUser(no le llega la llamada)
    //   var call = this.peer.call(this.selectedUser, stream);
    //     if(call){
    //       call.on('stream', (remotestream)=> {        
    //         const video: any = document.getElementById('myvideo');
    //         video.style.display = 'block';
    //         if ('srcObject' in video) {
    //           video.srcObject = remotestream;
    //           video.play();
    //         } else {
    //           // Avoid using this in new browsers, as it is going away.
    //           video.src = URL.createObjectURL(remotestream);
    //         }
    //         var closeCallBtn = document.getElementById('endcall');
    //         if (closeCallBtn) {
    //           closeCallBtn.addEventListener('click', (event) => {
    //             call.close();
    //             this.stopStreaming(stream);
    //           });
    //         }
    //       })
    //     }
    // },
    //   function (err) {
    //     console.log('Failed to get stream', err);
    //   });
  }

  disconnect(){
    this.peer.destroy();
  }

  stopStreaming(stream){
    stream.getTracks().forEach(function(track) {
      track.stop();
    });
    const video: any = document.getElementById('myvideo');
    video.style.display = 'none';
  }

  changeUserSelection(id: string){
    this.selectedUser = id;
  }
}
