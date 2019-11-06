import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadModalService {
  public type: string;
  public id: string;
  public hidden: string = 'hidden';
  public notification = new EventEmitter<any>();


  constructor() {    
  }

  hideModal() {
    this.hidden = 'hidden';
    this.type = null;
    this.id = null;
  }

  showModal(type: string, id: string) {
    this.hidden = 'block';
    this.type = type;
    this.id = id;    
  }
}
