import { PcComponent } from './../components/pc/pc/pc.component';
import { InviteComponent } from './invite/invite/invite.component';
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
import { ChatComponent } from '../components/chat/chat.component';

const pagesRoutes : Routes = [
    // { 
    //     path : '', 
    //     component : PagesComponent,
    //     canActivate: [LoginGuardGuard],
    //     children : [
            { path : 'dashboard', canActivate: [LoginGuardGuard, ChecktokenGuard], component : TablesComponent, data: { title:'Home'}},            
            { path : 'progress', canActivate: [LoginGuardGuard, ChecktokenGuard], component : ProgressComponent, data: { title:'Progress'}},
            { path : 'graphs1', canActivate: [LoginGuardGuard, ChecktokenGuard], component : Graficas1Component, data: { title:'Gráficos'}},
            // { path : 'promesas', canActivate: [LoginGuardGuard, ChecktokenGuard], component : PromesasComponent, data: { title:'Promess'}},
            // { path : 'rxjs', canActivate: [LoginGuardGuard, ChecktokenGuard], component : RxjsComponent, data: { title:'Observables'}},
            { path : 'profile', canActivate: [LoginGuardGuard, ChecktokenGuard], component : ProfileComponent, data: { title:'main.see_profile'}},
            { path : 'profile/:id', canActivate: [LoginGuardGuard, ChecktokenGuard], component : ProfileComponent, data: { title:'main.see_profile'}},
            { path : 'search/:term', canActivate: [LoginGuardGuard, ChecktokenGuard], component : SearchComponent, data: { title:'Buscador'}},
            { path : 'settings', canActivate: [LoginGuardGuard, ChecktokenGuard], component : AccountSettingsComponent, data: { title:'main.settings'}},
            { path : 'add-table', canActivate: [LoginGuardGuard, ChecktokenGuard], component : CreateTableComponent, data: { title:'main.create_game'}},            
            { path : 'add-match', canActivate: [LoginGuardGuard, ChecktokenGuard], component : CreateMatchComponent, data: { title:'main.add_game'}},            
            { path : 'add-bet-type', canActivate: [LoginGuardGuard, ChecktokenGuard], component : CreateBetTypeComponent, data: { title:'main.create_bet_type'}},            
            { path : 'livescores', component : LivescoresComponent, data: { title:'main.livescores'}},            
            { path : 'tables', component : TablesComponent, data: { title:'main.active_games'}},
            { path : 'ranking', component : RankingComponent, data: { title:'main.winners_ranking'}},
            { path : 'set-winner-choices', canActivate: [LoginGuardGuard, ChecktokenGuard], component : CheckMatchesComponent, data: { title:'main.bet_checking'}},            
            // { path : 'notifications', canActivate: [LoginGuardGuard, ChecktokenGuard], component : NotificationsComponent, data: { title:'Notificaciones'}},      
            
            { path : 'test', component : PcComponent, data: { title:'main.winners_ranking'}},
             
            //MANTENIMIENTOS
            { canActivate: [AdminGuard], path : 'users', component : UsersComponent, data: { title:'Mantenimiento de usuarios'}},
             { path : 'table/:id', component : TableComponent, data: { title:'main.game_table'}},
             { path : 'invite', component : InviteComponent, data: { title:'main.invite_friends'}},
             { path : '', redirectTo : '/dashboard', pathMatch : 'full', data: { title:'main.main'}},
             
             { path : 'chat', component : ChatComponent, data: { title:'Chat'}},
    //     ]

    // }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);