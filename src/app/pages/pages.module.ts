import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

// module routes
import { PAGES_ROUTES } from './pages.routes';

// ng2 charts
// import { ChartsModule } from 'ng2-charts';

// import { PagesComponent } from "./pages.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table/table.component';
import { CreateTableComponent } from './create-table/create-table.component';
import { CreateMatchComponent } from './table/create-match/create-match.component';
import { EditTableComponent } from './edit-table/edit-table/edit-table.component';
import { CreateBetTypeComponent } from './create-bettype/create-bet-type/create-bet-type.component';
import { CheckMatchesComponent } from './checkMatches/check-matches/check-matches.component';
import { LivescoresComponent } from './livescores/livescores/livescores.component';
import { TablesComponent } from './tables/tables/tables.component';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { RankingComponent } from './ranking/ranking/ranking.component';
import { PcComponent } from './../components/pc/pc/pc.component';

import { InviteComponent } from './invite/invite/invite.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// ...other imports
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

// NG PRIME COMPONENTES
import {PickListModule} from 'primeng/picklist';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';

// JQWIDGETS
import { jqxKanbanModule } from 'jqwidgets-ng/jqxkanban';
import { jqxSplitterModule } from 'jqwidgets-ng/jqxsplitter';
import { MaterialModule } from '../modules/material/material.module';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

registerLocaleData(localeEs);

@NgModule({
    declarations : [
        DashboardComponent,
        AccountSettingsComponent,
        ProfileComponent,
        UsersComponent,
        SearchComponent,
        // ChatComponent,
        TableComponent,
        CreateTableComponent,
        CreateMatchComponent,
        EditTableComponent,
        CreateBetTypeComponent,
        CheckMatchesComponent,
        LivescoresComponent,
        TablesComponent,
        NotificationsComponent,
        RankingComponent,
        InviteComponent,
        PcComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports : [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        // ChartsModule,
        PipesModule,
        CommonModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [ HttpClient ]
            }
          }),
        PickListModule,
        DropdownModule,
        InputTextModule,
        jqxKanbanModule,
        jqxSplitterModule,
        MaterialModule,
        CalendarModule
    ]
})

export class PagesModule {}
