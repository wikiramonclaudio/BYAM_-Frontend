import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//routes
import { APP_ROUTES } from './app.routes';

//Modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// const config: SocketIoConfig = { url:'http://localhost:3000', options: {} };

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
//services
// import { SettingsService } from './services/service.index';
import { ServiceModule } from './services/service.module';
import { SharedModule } from './shared/shared.module';
import { AutoGeneratedComponent } from './auto-generated/auto-generated.component';
import { PagesComponent } from './pages/pages.component';
// import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
 
// const configs: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AutoGeneratedComponent,
    PagesComponent,    
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,    
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
    // SocketIoModule.forRoot(configs)
  ],
  providers: [
    // SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
