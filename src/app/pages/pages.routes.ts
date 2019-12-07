// import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { TablesComponent } from './tables/tables/tables.component';
import { LivescoresComponent } from './livescores/livescores/livescores.component';
import { CheckMatchesComponent } from './checkMatches/check-matches/check-matches.component';
import { CreateBetTypeComponent } from './create-bettype/create-bet-type/create-bet-type.component';
import { CreateMatchComponent } from './table/create-match/create-match.component';
import { RouterModule, Routes } from "@angular/router";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { LoginGuardGuard, AdminGuard, ChecktokenGuard } from "../services/service.index";
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./users/users.component";
import { SearchComponent } from "./search/search.component";
import { TableComponent } from './table/table/table.component';
import { CreateTableComponent } from './create-table/create-table.component';
import { RankingComponent } from './ranking/ranking/ranking.component';

const pagesRoutes : Routes = [
    // { 
    //     path : '', 
    //     component : PagesComponent,
    //     canActivate: [LoginGuardGuard],
    //     children : [
            { path : 'dashboard', canActivate: [LoginGuardGuard, ChecktokenGuard], component : TablesComponent, data: { title:'Home'}},            
            { path : 'progress', canActivate: [LoginGuardGuard, ChecktokenGuard], component : ProgressComponent, data: { title:'Progress'}},
            { path : 'graphs1', canActivate: [LoginGuardGuard, ChecktokenGuard], component : Graficas1Component, data: { title:'Gráficos'}},
            { path : 'promesas', canActivate: [LoginGuardGuard, ChecktokenGuard], component : PromesasComponent, data: { title:'Promess'}},
            { path : 'rxjs', canActivate: [LoginGuardGuard, ChecktokenGuard], component : RxjsComponent, data: { title:'Observables'}},
            { path : 'profile', canActivate: [LoginGuardGuard, ChecktokenGuard], component : ProfileComponent, data: { title:'Perfil de usuario'}},
            { path : 'profile/:id', canActivate: [LoginGuardGuard, ChecktokenGuard], component : ProfileComponent, data: { title:'Perfil de usuario'}},
            { path : 'search/:term', canActivate: [LoginGuardGuard, ChecktokenGuard], component : SearchComponent, data: { title:'Buscador'}},
            { path : 'settings', canActivate: [LoginGuardGuard, ChecktokenGuard], component : AccountSettingsComponent, data: { title:'Ajustes'}},
            { path : 'add-table', canActivate: [LoginGuardGuard, ChecktokenGuard], component : CreateTableComponent, data: { title:'Crear partida'}},            
            { path : 'add-match', canActivate: [LoginGuardGuard, ChecktokenGuard], component : CreateMatchComponent, data: { title:'Crear partido'}},            
            { path : 'add-bet-type', canActivate: [LoginGuardGuard, ChecktokenGuard], component : CreateBetTypeComponent, data: { title:'Crear tipo de apuesta'}},            
            { path : 'livescores', component : LivescoresComponent, data: { title:'Resultados en directo'}},            
            { path : 'tables', component : TablesComponent, data: { title:'Partidas en juego'}},
            { path : 'ranking', component : RankingComponent, data: { title:'Ranking ganadores'}},
            { path : 'set-winner-choices', canActivate: [LoginGuardGuard, ChecktokenGuard], component : CheckMatchesComponent, data: { title:'Revisión de apuestas'}},            
            // { path : 'notifications', canActivate: [LoginGuardGuard, ChecktokenGuard], component : NotificationsComponent, data: { title:'Notificaciones'}},            
             
            //MANTENIMIENTOS
            { canActivate: [AdminGuard], path : 'users', component : UsersComponent, data: { title:'Mantenimiento de usuarios'}},
             { path : 'table/:id', component : TableComponent, data: { title:'Mesa de juego'}},
             { path : '', redirectTo : '/dashboard', pathMatch : 'full', data: { title:'Dashboard'}} 
             // { path : 'chat', component : ChatComponent, data: { title:'Chat'}},
    //     ]

    // }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);