
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
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
// import { ChatComponent } from '../components/chat/chat.component';

const pagesRoutes : Routes = [
    // { 
    //     path : '', 
    //     component : PagesComponent,
    //     canActivate: [LoginGuardGuard],
    //     children : [
            { path : 'dashboard', canActivate: [LoginGuardGuard, ChecktokenGuard], component : DashboardComponent, data: { title:'Home'}},            
            { path : 'progress', canActivate: [LoginGuardGuard, ChecktokenGuard], component : ProgressComponent, data: { title:'Progress'}},
            { path : 'graphs1', canActivate: [LoginGuardGuard, ChecktokenGuard], component : Graficas1Component, data: { title:'Gráficos'}},
            { path : 'promesas', canActivate: [LoginGuardGuard, ChecktokenGuard], component : PromesasComponent, data: { title:'Promess'}},
            { path : 'rxjs', canActivate: [LoginGuardGuard, ChecktokenGuard], component : RxjsComponent, data: { title:'Observables'}},
            { path : 'profile', canActivate: [LoginGuardGuard, ChecktokenGuard], component : ProfileComponent, data: { title:'Perfil de usuario'}},
            { path : 'profile/:id', canActivate: [LoginGuardGuard, ChecktokenGuard], component : ProfileComponent, data: { title:'Perfil de usuario'}},
            { path : 'search/:term', canActivate: [LoginGuardGuard, ChecktokenGuard], component : SearchComponent, data: { title:'Buscador'}},
            { path : 'settings', canActivate: [LoginGuardGuard, ChecktokenGuard], component : AccountSettingsComponent, data: { title:'Ajustes'}},
            { path : 'add-table', canActivate: [LoginGuardGuard, ChecktokenGuard], component : CreateTableComponent, data: { title:'Crear mesa de juego'}},            
            
            //MANTENIMIENTOS
            { canActivate: [AdminGuard], path : 'users', component : UsersComponent, data: { title:'Mantenimiento de usuarios'}},
             { path : 'table/:id', component : TableComponent, data: { title:'Mesa de juego'}},
            // { path : 'chat', component : ChatComponent, data: { title:'Chat'}},
            { path : '', redirectTo : '/dashboard', pathMatch : 'full', data: { title:'Dashboard'}},  
    //     ]

    // }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);