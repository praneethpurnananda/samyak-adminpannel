import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from "@angular/common/http";

//own-module
import { MainModuleModule } from "../main-module/main-module.module";

//ng-material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {MatRippleModule} from '@angular/material/core';



@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MainModuleModule,
    MatMenuModule,
    MatRippleModule
  ],
  exports: [
    ToolbarComponent
  ],
})
export class NavbarFooterModule { }
