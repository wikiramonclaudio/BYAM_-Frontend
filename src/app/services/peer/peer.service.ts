import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  peer: any;
  anotherId;
  mypeerid;  

  constructor(
    public userService: UserService
  ) { }

  initPeer() {
    let video = null;
    //no funciona bien si le paso el id del user(si le quito el parametro si funciona)
    this.peer = new Peer(this.userService.user._id);
    var conn = this.peer.connect(this.userService.user._id);
    // on open will be launch when you successfully connect to PeerServer
    conn.on('open', function(){
      // here you have conn.id
      conn.send('hi!');
    });
    setTimeout(() => {
      this.mypeerid = this.peer.id;
      console.log('MY PEER', this.peer);
      console.log('mypeerid', this.mypeerid);
      console.log('PEER', this.peer);
      video = document.getElementById('myvideo');;
      this.peer.on('connection', function (conn) {
        console.log('PEER CONNECTION', conn);
        conn.on('data', function (data) {
          console.log('DATA PEER JS', data);
        });
      });
      // this.connect();
    }, 3000);
    var n = <any>navigator;

    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);

    this.peer.on('call', (call) => {
      console.log('CAALLLLL???', call);
      swal('LLamada entrante', 'contestar??', { buttons: ['Rechazar', 'Aceptar'] }).then((value) => {
        if (value == true) {
          n.getUserMedia({ video: true, audio: true }, (stream) => {
            call.answer(stream);
            call.on('stream', (remotestream) => {
              const video: any = document.getElementById('myvideo');
              if ('srcObject' in video) {
                video.srcObject = remotestream;
                video.play();
              } else {
                // Avoid using this in new browsers, as it is going away.
                video.src = URL.createObjectURL(remotestream);
              }
              var closeCallBtn = document.getElementById('endcall');
              if (closeCallBtn) {
                closeCallBtn.addEventListener('click', (event) => {
                  call.close();
                  this.stopStreaming(stream);
                });
              }
            });
          }, function (err) {
            console.log('Failed to get stream', err);
          })
        }
      });

    })
  }

  startCall(userId: string) {
    var n = <any>navigator;
    console.log('QUE ES LA VARIABLE N --> ', n);    
    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
    // n.getUserMedia = (n.mozGetUserMedia || n.getUserMedia || n.webkitGetUserMedia || n.msGetUserMedia);
    n.getUserMedia({ video: true, audio: true }, (stream) => {
      // Call a peer, providing our mediaStream
      // no funciona cuando le paso el this.selectedUser(no le llega la llamada)
      var call = this.peer.call(userId, stream);
        if(call){
          call.on('stream', (remotestream)=> {        
            const video: any = document.getElementById('myvideo');
            video.style.display = 'block';
            if ('srcObject' in video) {
              video.srcObject = remotestream;
              video.play();
            } else {
              // Avoid using this in new browsers, as it is going away.
              video.src = URL.createObjectURL(remotestream);
            }
            var closeCallBtn = document.getElementById('endcall');
            if (closeCallBtn) {
              closeCallBtn.addEventListener('click', (event) => {
                call.close();
                this.stopStreaming(stream);
              });
            }
          })
        }
    },
      function (err) {
        console.log('Failed to get stream', err);
      });
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
}
