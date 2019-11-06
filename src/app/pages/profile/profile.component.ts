import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import swal from 'sweetalert';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  fileToUpload: File;
  provisionalImg: any;
  constructor(
    public userService: UserService
  ) { 
    this.user = this.userService.user;
  }

  ngOnInit() {
  }

  save(user: User){
    this.user.name = user.name;
    if(!this.user.google){
      this.user.email = user.email;      
    }
    this.userService.updateUser(this.user).subscribe();
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
    this.userService.changeImg(this.fileToUpload, this.user._id);
  }

}
