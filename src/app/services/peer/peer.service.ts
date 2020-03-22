import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import swal from 'sweetalert';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class PeerService {

  peer: any;
  anotherId;
  mypeerid;
  videoSrc: any;

  constructor(
    public userService: UserService
  ) { }

  initPeer() {
    let video = null;
    //no funciona bien si le paso el id del user(si le quito el parametro si funciona)
    this.peer = new Peer(this.userService.user._id);
    var conn = this.peer.connect(this.userService.user._id);
    // on open will be launch when you successfully connect to PeerServer
    conn.on('open', function () {
      console.log('CONEXION DE NUEVO USUARIO ABIERTA');
      // here you have conn.id
      conn.send('hi!');
    });
    setTimeout(() => {
      this.mypeerid = this.peer.id;
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
      var n = <any>navigator;
      console.log('N DEFINIDA', n);
      // const getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);

      this.peer.on('call', (call) => {
        console.log('CAALLLLL???', call);
        swal('LLamada entrante', 'contestar??', { buttons: ['Rechazar', 'Aceptar'] }).then((value) => {
          if (value == true) {
            var n = <any>navigator;
            // if(n.getUserMedia){      
            var p = navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            p.then((stream)=> {
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
            });

            p.catch(function (err) { console.log('EERRROROLO REcibiendo llamada', err.name); }); // always check for errors at the end.     
            // n.mediaDevices.getUserMedia({ video: true, audio: true }, (stream) => {
            //   call.answer(stream);
            //   call.on('stream', (remotestream) => {
            //     const video: any = document.getElementById('myvideo');
            //     if ('srcObject' in video) {
            //       video.srcObject = remotestream;
            //       video.play();
            //     } else {
            //       // Avoid using this in new browsers, as it is going away.
            //       video.src = URL.createObjectURL(remotestream);
            //     }
            //     var closeCallBtn = document.getElementById('endcall');
            //     if (closeCallBtn) {
            //       closeCallBtn.addEventListener('click', (event) => {
            //         call.close();
            //         this.stopStreaming(stream);
            //       });
            //     }
            //   });
            // });
            // }else{
            //   console.info('REVISAR NAVIGATOR GET USER MEDIA EN ESTE BROWSER NO FUNCIONA');
            // }


            // n.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
            //   call.answer(stream);
            //   call.on('stream', (remotestream) => {
            //     const video: any = document.getElementById('myvideo');
            //     if ('srcObject' in video) {
            //       video.srcObject = remotestream;
            //       video.play();
            //     } else {
            //       // Avoid using this in new browsers, as it is going away.
            //       video.src = URL.createObjectURL(remotestream);
            //     }
            //     var closeCallBtn = document.getElementById('endcall');
            //     if (closeCallBtn) {
            //       closeCallBtn.addEventListener('click', (event) => {
            //         call.close();
            //         this.stopStreaming(stream);
            //       });
            //     }
            //   });


            // }, (error) => {
            //   console.log('ERROR', error);
            // });

            // if (typeof n.mediaDevices.getUserMedia === 'undefined') {
            //   n.getUserMedia({
            //     audio: true,
            //     video: true
            //   }, (stream) => {
            //     call.answer(stream);
            //     call.on('stream', (remotestream) => {
            //       const video: any = document.getElementById('myvideo');
            //       if ('srcObject' in video) {
            //         video.srcObject = remotestream;                    
            //         this.videoSrc = remotestream;
            //         // video.play();
            //       } else {
            //         // Avoid using this in new browsers, as it is going away.
            //         video.src = URL.createObjectURL(remotestream);
            //         this.videoSrc = URL.createObjectURL(remotestream);
            //       }
            //       var closeCallBtn = document.getElementById('endcall');
            //       if (closeCallBtn) {
            //         closeCallBtn.addEventListener('click', (event) => {
            //           call.close();
            //           this.stopStreaming(stream);
            //         });
            //       }
            //     });

            //   }, (error) => {
            //     console.log('ERROR', error);
            //   });
            // } else {
            //   n.mediaDevices.getUserMedia({
            //     audio: true,
            //     video: true
            //   }).then((stream) => {
            //     call.answer(stream);
            //     call.on('stream', (remotestream) => {
            //       const video: any = document.getElementById('myvideo');
            //       if ('srcObject' in video) {
            //         video.srcObject = remotestream;
            //         // video.play();
            //       } else {
            //         // Avoid using this in new browsers, as it is going away.
            //         video.src = URL.createObjectURL(remotestream);
            //       }
            //       var closeCallBtn = document.getElementById('endcall');
            //       if (closeCallBtn) {
            //         closeCallBtn.addEventListener('click', (event) => {
            //           call.close();
            //           this.stopStreaming(stream);
            //         });
            //       }
            //     });

            //   }).catch((error) => {
            //     console.log('ERROR', error);
            //   });
            // }
          }
        });//swal
      })//call
    }, 3000);
  }

  startCall(userId: string) {
    var n = <any>navigator;
    // n.getUserMedia = ( n.mediaDevices.getUserMedia || n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);

    var p = n.mediaDevices.getUserMedia({ audio: true, video: true });
    p.then( (stream)=> {
      if (!this.peer)
        this.peer = new Peer(this.userService.user._id);
      var call = this.peer.call(userId, stream);
      if (call) {
        call.on('stream', (remotestream) => {
          const video: any = document.getElementById('myvideo');
          video.style.display = 'block';
          if ('srcObject' in video) {
            video.srcObject = remotestream;
            this.videoSrc = remotestream;
            // video.play();
          } else {
            // Avoid using this in new browsers, as it is going away.
            video.src = URL.createObjectURL(remotestream);
            this.videoSrc = URL.createObjectURL(remotestream);
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
    });

    p.catch(function (err) { console.log('EERRROROLO REcibiendo llamada', err.name); });
    // n.getUserMedia({ video: true, audio: true }, (stream) => {
    //   // Call a peer, providing our mediaStream
    //   // no funciona cuando le paso el this.selectedUser(no le llega la llamada)
    //   if (!this.peer)
    //     this.peer = new Peer(this.userService.user._id);
    //   var call = this.peer.call(userId, stream);
    //   if (call) {
    //     call.on('stream', (remotestream) => {
    //       const video: any = document.getElementById('myvideo');
    //       video.style.display = 'block';
    //       if ('srcObject' in video) {
    //         video.srcObject = remotestream;
    //         this.videoSrc = remotestream;
    //         // video.play();
    //       } else {
    //         // Avoid using this in new browsers, as it is going away.
    //         video.src = URL.createObjectURL(remotestream);
    //         this.videoSrc = URL.createObjectURL(remotestream);
    //       }
    //       var closeCallBtn = document.getElementById('endcall');
    //       if (closeCallBtn) {
    //         closeCallBtn.addEventListener('click', (event) => {
    //           call.close();
    //           this.stopStreaming(stream);
    //         });
    //       }
    //     })
    //   }
    // },
    //   function (err) {
    //     console.log('Failed to get stream', err);
    //   });
  }

  disconnect() {
    this.peer.destroy();
  }

  stopStreaming(stream) {
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
    // const video: any = document.getElementById('myvideo');
    // video.style.display = 'none';
  }
}
