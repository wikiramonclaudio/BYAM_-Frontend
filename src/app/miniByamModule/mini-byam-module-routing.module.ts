import { NotificationsComponent } from './../pages/notifications/notifications/notifications.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard, ChecktokenGuard } from '../services/service.index';


const routes: Routes = [
    { path : 'kanban', canActivate: [LoginGuardGuard, ChecktokenGuard], component : NotificationsComponent, data: { title: 'Home'}}
];

export const MINIBYAM_ROUTES = RouterModule.forChild(routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiniByamRoutingModule { }
