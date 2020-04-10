import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MINIBYAM_ROUTES } from './mini-byam-module-routing.module';

import { PipesModule } from '../pipes/pipes.module';
import { MainComponent } from './main/main.component';
import { NewGameComponent } from './new-game/new-game.component';

import {PickListModule} from 'primeng/picklist';
import {DropdownModule} from 'primeng/dropdown';

import { MinibyamDashboardComponent } from './minibyam-dashboard/minibyam-dashboard.component';
import { FormationComponent } from './formation/formation.component';
import { LiveGameComponent } from './live-game/live-game.component';
import { StadiumComponent } from './stadium/stadium.component';
import { ClassificationsComponent } from './classifications/classifications.component';

import {TableModule} from 'primeng/table';
// import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import { jqxExpanderModule } from 'jqwidgets-ng/jqxexpander';

import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [
  MainComponent,
  NewGameComponent,
  MinibyamDashboardComponent,
  FormationComponent,
  LiveGameComponent,
  StadiumComponent,
  ClassificationsComponent],
  imports: [
    // BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    PipesModule,
    PickListModule,
    DropdownModule,
    MINIBYAM_ROUTES,
    TableModule,
    DialogModule,
    jqxExpanderModule,
    AccordionModule.forRoot()
    // DataViewModule
  ],
  providers: [

  ]
})
export class MiniByamModule { }
