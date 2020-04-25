import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var JitsiMeetExternalAPI;
declare var $;
@Component({
  selector: 'pc',
  templateUrl: './pc.component.html',
  styleUrls: ['./pc.component.css']
})
export class PcComponent implements OnInit {
  // @ViewChild('startButton',{static: false}) startButton: ElementRef;
  // @ViewChild('callButton', {static: false}) callButton: ElementRef;
  // @ViewChild('hangupButton', {static: false}) hangupButton: ElementRef;
  // @ViewChild('localVideo', {static: false}) localVideo: ElementRef;
  // @ViewChild('remoteVideo', {static: false}) remoteVideo: ElementRef;


  // startButtonDisabled = false;
  // callButtonDisabled = true;
  // hangupButtonDisabled = true;

  // startTime;
  // localStream;
  // pc1;
  // pc2;
  // offerOptions = {
  //   offerToReceiveAudio: 1,
  //   offerToReceiveVideo: 1
  // };

  closedCall: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {

    // var options = {
    //     roomName: "Embed",
    //     width: 700,
    //     height: 700,
    //     parentNode: document.querySelector('#meet')
    // }
    // var api = new JitsiMeetExternalAPI(domain, options);

    var domain = "meet.jit.si";
    let test: any = this.route.snapshot.params;
    var options: any = {
      roomName: test.roomName,
      width: '85%',
      height: 600,
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
        // MOBILE_APP_PROMO: true,
        SHOW_CHROME_EXTENSION_BANNER: false,
        OPEN_IN_MOBILE_BROWSER: true
      },
      configOverwrite: {
        disableInviteFunctions: false,
        enableNoAudioDetection: false,
        enableNoisyMicDetection: false,
        enableWelcomePage: false,
        enableClosePage: false,
        useIPv6: true,
        defaultLanguage: 'es',
        // disableThirdPartyRequests: false,
        gatherStats: false,
        testing: {
          // Enables experimental simulcast support on Firefox.
          enableFirefoxSimulcast: true
        }
      },
      parentNode: document.querySelector('#meet')
    }
    // options.parentNode = document.querySelector('#meet');
    setTimeout(() => {
      options.parentNode = document.querySelector('#meet');
      const api = new JitsiMeetExternalAPI(domain, options);
      api.addEventListener('readyToClose', () => {
        $('iframe').hide();
        this.closedCall = true;
      });

      // api.invite([ {email: 'makarenosh@gmail.com', number: 615077406}]).then(() => {
      //   console.log('INVITADO');
      // }).catch(() => {
      //   console.log('ERROROLO');
      // });
    }, 300);

  }

  rejoin() {
    this.ngOnInit();
  }

  salir() {
    window.close();
  }

  // getName(pc) {
  //   return (pc === this.pc1) ? 'pc1' : 'pc2';
  // }

  // getOtherPc(pc) {
  //   return (pc === this.pc1) ? this.pc2 : this.pc1;
  // }

  // gotStream(stream) {
  //   console.log('Received local stream', stream);
  //   this.localVideo.nativeElement.srcObject = stream;
  //   this.localStream = stream;
  //   this.callButtonDisabled = false;
  // }

  // start() {
  //   this.trace('Requesting local stream');
  //   this.startButtonDisabled = true;
  //   navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //     video: true
  //   })
  //   .then(this.gotStream.bind(this))
  //   .catch(function(e) {
  //     alert('getUserMedia() error: ' + e.name);
  //   });
  // }

  // call() {
  //   this.callButtonDisabled = true;
  //   this.hangupButtonDisabled = false;
  //   this.trace('Starting call');
  //   this.startTime = window.performance.now();
  //   var videoTracks = this.localStream.getVideoTracks();
  //   var audioTracks = this.localStream.getAudioTracks();
  //   if (videoTracks.length > 0) {
  //     this.trace('Using video device: ' + videoTracks[0].label);
  //   }
  //   if (audioTracks.length > 0) {
  //     this.trace('Using audio device: ' + audioTracks[0].label);
  //   }
  //   var servers = null;
  //   this.pc1 = new RTCPeerConnection(servers);
  //   this.trace('Created local peer connection object pc1');
  //   this.pc1.onicecandidate = e => {
  //     this.onIceCandidate(this.pc1, e);
  //   };
  //   this.pc2 = new RTCPeerConnection(servers);
  //   this.trace('Created remote peer connection object pc2');

  //   this.pc2.onicecandidate = e => {
  //     this.onIceCandidate(this.pc2, e);
  //   };
  //   this.pc1.oniceconnectionstatechange = e => {
  //     this.onIceStateChange(this.pc1, e);
  //   };
  //   this.pc2.oniceconnectionstatechange = e => {
  //     this.onIceStateChange(this.pc2, e);
  //   };
  //   this.pc2.ontrack = this.gotRemoteStream.bind(this);

  //   this.localStream.getTracks().forEach(
  //     track => {
  //       this.pc1.addTrack(
  //         track,
  //         this.localStream
  //       );
  //     }
  //   );
  //   this.trace('Added local stream to pc1');

  //   this.trace('pc1 createOffer start');
  //   this.pc1.createOffer(
  //     this.offerOptions
  //   ).then(
  //     this.onCreateOfferSuccess.bind(this),
  //     this.onCreateSessionDescriptionError.bind(this)
  //   );
  // }

  // onCreateSessionDescriptionError(error) {
  //   this.trace('Failed to create session description: ' + error.toString());
  // }

  // onCreateOfferSuccess(desc) {
  //   this.trace('Offer from pc1\n' + desc.sdp);
  //   this.trace('pc1 setLocalDescription start');
  //   this.pc1.setLocalDescription(desc).then(
  //     () => {
  //       this.onSetLocalSuccess(this.pc1);
  //     },
  //     this.onSetSessionDescriptionError.bind(this)
  //   );
  //   this.trace('pc2 setRemoteDescription start');
  //   this.pc2.setRemoteDescription(desc).then(
  //     () => {
  //       this.onSetRemoteSuccess(this.pc2);
  //     },
  //     this.onSetSessionDescriptionError.bind(this)
  //   );
  //   this.trace('pc2 createAnswer start');
  //   // Since the 'remote' side has no media stream we need
  //   // to pass in the right constraints in order for it to
  //   // accept the incoming offer of audio and video.
  //   this.pc2.createAnswer().then(
  //     this.onCreateAnswerSuccess.bind(this),
  //     this.onCreateSessionDescriptionError.bind(this)
  //   );
  // }

  // onSetLocalSuccess(pc) {
  //   this.trace(this.getName(pc) + ' setLocalDescription complete');
  // }

  // onSetRemoteSuccess(pc) {
  //   this.trace(this.getName(pc) + ' setRemoteDescription complete');
  // }

  // onSetSessionDescriptionError(error) {
  //   this.trace('Failed to set session description: ' + error.toString());
  // }

  // gotRemoteStream(e) {
  //   if (this.remoteVideo.nativeElement.srcObject !== e.streams[0]) {
  //     this.remoteVideo.nativeElement.srcObject = e.streams[0];
  //     this.trace('pc2 received remote stream');
  //   }
  // }

  // onCreateAnswerSuccess(desc) {
  //   this.trace('Answer from pc2:\n' + desc.sdp);
  //   this.trace('pc2 setLocalDescription start');
  //   this.pc2.setLocalDescription(desc).then(
  //     () => {
  //       this.onSetLocalSuccess(this.pc2);
  //     },
  //     this.onSetSessionDescriptionError.bind(this)
  //   );
  //   this.trace('pc1 setRemoteDescription start');
  //   this.pc1.setRemoteDescription(desc).then(
  //     () => {
  //       this.onSetRemoteSuccess(this.pc1);
  //     },
  //     this.onSetSessionDescriptionError.bind(this)
  //   );
  // }

  // onIceCandidate(pc, event) {
  //   this.getOtherPc(pc).addIceCandidate(event.candidate)
  //   .then(
  //     () => {
  //       this.onAddIceCandidateSuccess(pc);
  //     },
  //     (err) => {
  //       this.onAddIceCandidateError(pc, err);
  //     }
  //   );
  //   this.trace(this.getName(pc) + ' ICE candidate: \n' + (event.candidate ?
  //       event.candidate.candidate : '(null)'));
  // }

  // onAddIceCandidateSuccess(pc) {
  //   this.trace(this.getName(pc) + ' addIceCandidate success');
  // }

  // onAddIceCandidateError(pc, error) {
  //   this.trace(this.getName(pc) + ' failed to add ICE Candidate: ' + error.toString());
  // }

  // onIceStateChange(pc, event) {
  //   if (pc) {
  //     this.trace(this.getName(pc) + ' ICE state: ' + pc.iceConnectionState);
  //     console.log('ICE state change event: ', event);
  //   }
  // }

  // hangup() {
  //   this.trace('Ending call');
  //   this.pc1.close();
  //   this.pc2.close();
  //   this.pc1 = null;
  //   this.pc2 = null;
  //   this.hangupButtonDisabled = true;
  //   this.callButtonDisabled = false;
  // }

  // trace(arg) {
  //   var now = (window.performance.now() / 1000).toFixed(3);
  //   console.log(now + ': ', arg);
  // }
}
