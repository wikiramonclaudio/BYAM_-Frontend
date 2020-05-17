import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string = 'users'): any {
    const url = URL_SERVICES + '/upload/';
    if (!img || img == 'null') {
      return url + 'users/xxx';
    } else {
      if (img.indexOf('https') >= 0) {
        return img;
      } else {
        return url + '/' + type + '/' + img;
      }
    }

  }

}
