import { ClassificationsComponent } from './classifications/classifications.component';
import { StadiumComponent } from './stadium/stadium.component';
import { FormationComponent } from './formation/formation.component';
import { LiveGameComponent } from './live-game/live-game.component';
import { MinibyamDashboardComponent } from './minibyam-dashboard/minibyam-dashboard.component';
import { NewGameComponent } from './new-game/new-game.component';
import { MainComponent } from './main/main.component';
import { NotificationsComponent } from './../pages/notifications/notifications/notifications.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard, ChecktokenGuard } from '../services/service.index';


const routes: Routes = [
    { path : 'kanban', canActivate: [LoginGuardGuard, ChecktokenGuard], component : NotificationsComponent, data: { title: 'Home'}},
    { path : '', canActivate: [LoginGuardGuard, ChecktokenGuard], component : MainComponent, data: { title: 'Main'}},
    { path : 'minibyam-dashboard', canActivate: [LoginGuardGuard, ChecktokenGuard], component : MinibyamDashboardComponent, data: { title: 'Game dashboard'}},
    { path : 'newgame', canActivate: [LoginGuardGuard, ChecktokenGuard], component : NewGameComponent, data: { title: 'Iniciar nueva partida'}},
    { path : 'formation', canActivate: [LoginGuardGuard, ChecktokenGuard], component : FormationComponent, data: { title: 'Formación'}},
    { path : 'livegame', canActivate: [LoginGuardGuard, ChecktokenGuard], component : LiveGameComponent, data: { title: 'Partido en Juego'}},
    { path : 'stadium', canActivate: [LoginGuardGuard, ChecktokenGuard], component : StadiumComponent, data: { title: 'Estadio'}},
    { path : 'classifications', canActivate: [LoginGuardGuard, ChecktokenGuard], component : ClassificationsComponent, data: { title: 'Estadio'}}
];

export const MINIBYAM_ROUTES = RouterModule.forChild(routes);

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class MiniByamRoutingModule { }
