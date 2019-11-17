import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from '@angular/forms';

//module routes
import { PAGES_ROUTES } from './pages.routes';

//ng2 charts
import { ChartsModule } from 'ng2-charts';

// import { PagesComponent } from "./pages.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from './progress/progress.component';
// tslint:disable-next-line:quotemark
import { IncrementatorComponent } from "../components/incrementator/incrementator.component";
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from "../pipes/pipes.module";
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from "@angular/common";
import { UsersComponent } from './users/users.component';
// import { UploadWindowComponent } from '../components/upload-window/upload-window.component';
import { SearchComponent } from './search/search.component';
import { ChatComponent } from '../components/chat/chat.component';
import { TableComponent } from './table/table/table.component';
import { CreateTableComponent } from './create-table/create-table.component';
import { CreateMatchComponent } from './table/create-match/create-match.component';
import { EditTableComponent } from './edit-table/edit-table/edit-table.component';
import { CreateBetTypeComponent } from './create-bettype/create-bet-type/create-bet-type.component';
import { CheckMatchesComponent } from './checkMatches/check-matches/check-matches.component';
import { LivescoresComponent } from './livescores/livescores/livescores.component';
import { TablesComponent } from './tables/tables/tables.component';

@NgModule({
    declarations : [        
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,  
        IncrementatorComponent, GraficoDonaComponent, AccountSettingsComponent, PromesasComponent, RxjsComponent, ProfileComponent, UsersComponent, SearchComponent, ChatComponent, TableComponent, CreateTableComponent, CreateMatchComponent, EditTableComponent, CreateBetTypeComponent, CheckMatchesComponent, LivescoresComponent, TablesComponent
    ],
    exports: [
        DashboardComponent,
        Graficas1Component,
        
    ],
    imports : [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
        CommonModule                
    ]
})

export class PagesModule{}