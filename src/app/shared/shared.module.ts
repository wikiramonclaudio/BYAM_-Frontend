import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { NopagefoundComponent } from "../nopagefound/nopagefound.component";
import { PipesModule } from "../pipes/pipes.module";
import { UploadWindowComponent } from "../components/upload-window/upload-window.component";

@NgModule({
    imports: [
        RouterModule,      
        CommonModule,
        PipesModule
    ],
    declarations : [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        UploadWindowComponent
    ], 
    exports : [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        UploadWindowComponent
    ]
})

export class SharedModule {}