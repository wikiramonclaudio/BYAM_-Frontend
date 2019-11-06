import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { RegisterComponent } from "./login/register/register.component";
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/service.index';

const appRoutes : Routes = [
    { path : 'login', component : LoginComponent }, 
    { path : 'register', component : RegisterComponent },  
    //lazyload
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    },
    { path : '**', component : NopagefoundComponent },
    
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash : true });