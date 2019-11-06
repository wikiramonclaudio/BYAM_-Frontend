import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string = 'users'): any {
    let url = URL_SERVICES + '/upload/';   
    // console.log(img);
    // console.log(type);
    if(!img || img == 'null'){      
      return url + 'users/xxx'
    }else{
      if(img.indexOf('https')>=0){
        return img;
      }else{         
        return url + '/' + type + '/' + img; 
      }
    }

    // switch (type) {
    //   case 'user':
    //     return url += '/users/' + img;
    //     break;
    //   case 'doctor':
    //     return url += '/doctors/' + img;
    //     break;
    //   case 'hospital':
    //     return url += '/hospitals/' + img;
    //     break;
    
    //   default:
    //     break;
    // }
  }

}
