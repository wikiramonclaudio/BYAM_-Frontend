import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import swal from 'sweetalert';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { TranslateService } from '@ngx-translate/core';
declare var $;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  styles: []
})
export class ProfileComponent implements OnInit {
  public translate: TranslateService;
  user: User = new User('', '', '', '', 0);
  fileToUpload: File;
  provisionalImg: any;
  profileId;
  constructor(
    public userService: UserService,
    public route: ActivatedRoute,
    public translationService: TranslationService
  ) {
    // this.user = this.userService.user;
  }

  ngOnInit() {
    this.translate = this.translationService.getTranslateService();
    const profileId = this.route.snapshot.paramMap.get('id');
    this.profileId = profileId;
    if (!profileId) {
      this.user = this.userService.user;
    } else {
      this.userService.getUser(profileId).subscribe(
        res => {
          this.user = res.user;
        }
      );
    }
  }

  save(user: User) {
    this.user.name = user.name;
    if (!this.user.google) {
      this.user.email = user.email;
    }
    this.userService.updateUser(this.user).subscribe();
  }

  selectImage(file) {
    if (!file) {
      this.fileToUpload = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen.', 'success');
      this.fileToUpload = null;
      return;
    }


    this.fileToUpload = file;
    const reader = new FileReader();
    const urlTemp = reader.readAsDataURL(file);

    reader.onloadend = () => this.provisionalImg = reader.result;

  }

  updateImage() {
    this.userService.changeImg(this.fileToUpload, this.user._id);
  }

  activeImageSelector() {
    if (this.userService.user._id == this.profileId) {
      $('.input-img-selector').click();
    }

  }

}
