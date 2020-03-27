import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementator',
  templateUrl: './incrementator.component.html',
  styleUrls: ['./incrementator.component.css']
})
export class IncrementatorComponent implements OnInit {
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() progress: number = 50;
  @Input() legend: string = 'Leyenda';

  @Output() changeProgress: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  changeValue(value){
    if((this.progress >= 100 && value >= 0)){
      this.progress = 100;
      return
    }
    if((this.progress <= 0 && value <= 0)){
      this.progress = 0;
      return
    }
    this.progress = this.progress + value;
    
    this.changeProgress.emit(this.progress);
  }

  onChange(event: number){
    // let progressInput: any = document.getElementsByName('progress')[0];
    if((event >= 100)){
      this.progress = 100;      
    }
    else if((this.progress <= 0 && event <= 0)){
      this.progress = 0;      
    }else{
      this.progress = event;
    }
    this.txtProgress.nativeElement.value = this.progress;
    this.changeProgress.emit(this.progress);
  }

}
