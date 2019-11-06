import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { UserService, UploadFileService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';
import { UploadModalService } from './upload-modal.service';
@Component({
  selector: 'app-upload-window',
  templateUrl: './upload-window.component.html',
  styleUrls: ['./upload-window.component.css']
})
export class UploadWindowComponent implements OnInit {  
  user: User;
  fileToUpload: File;
  provisionalImg: any;

  constructor(
    public userService: UserService,
    public uploadService: UploadFileService,
    public uploadModalService: UploadModalService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

  
  selectImage(file){    
    if(!file){
      this.fileToUpload = null;
      return;
    }
    if(file.type.indexOf('image')< 0){
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen.', 'success');
      this.fileToUpload = null;
      return;
    }


    this.fileToUpload = file;
    let reader = new FileReader();
    let urlTemp = reader.readAsDataURL(file);

    reader.onloadend = ()=> this.provisionalImg = reader.result;
    
  }

  updateImage(){  
    this.uploadService.uploadFile(this.fileToUpload, this.uploadModalService.type, this.uploadModalService.id)
    .then(
      response=>{               
        this.uploadModalService.notification.emit( response );
        this.closeModal();
      }
    ).catch(
      error=>{
        console.log(error);
      }
    );  
  }

  closeModal(){
    this.fileToUpload = null;
    this.provisionalImg = null;

    this.uploadModalService.hideModal();
  }




}
