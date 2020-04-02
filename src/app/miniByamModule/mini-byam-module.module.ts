import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiniByamRoutingModule } from './mini-byam-module-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { PipesModule } from '../pipes/pipes.module';
import { ImagePipe } from '../pipes/image.pipe';
@NgModule({
  declarations: [
    ImagePipe
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MiniByamRoutingModule,
    PipesModule
  ]
})
export class MiniByamModule { }
