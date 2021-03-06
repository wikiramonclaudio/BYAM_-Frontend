import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularDraggableModule } from 'angular2-draggable';
// routes
import { APP_ROUTES } from './app.routes';

// Modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// const config: SocketIoConfig = { url:'http://localhost:3000', options: {} };

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
// services
// import { SettingsService } from './services/service.index';
import { ServiceModule } from './services/service.module';
import { SharedModule } from './shared/shared.module';
import { AutoGeneratedComponent } from './auto-generated/auto-generated.component';
import { PagesComponent } from './pages/pages.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { URL_SERVICES } from './config/config';
const config: SocketIoConfig = { url: URL_SERVICES, options: {} };
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslationComponent } from './translation/translation.component';
import { MinichatComponent } from './components/minichat/minichat.component';
import { PipesModule } from './pipes/pipes.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { PcComponent } from './components/pc/pc/pc.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AutoGeneratedComponent,
    PagesComponent,
    TranslationComponent,
    MinichatComponent,
    // PcComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
    AngularDraggableModule,
    PipesModule,
    SocketIoModule.forRoot(config),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [
    // SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
